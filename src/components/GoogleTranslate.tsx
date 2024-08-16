'use client'
import Script from 'next/script';
import { useEffect } from 'react';
import { isIOS } from 'react-device-detect';

declare global {
    interface Window {
        googleTranslateElementInit: () => void;
        MSStream: any;
    }
}
declare global {
    interface Navigator {
        userAgent: string;
    }
}

const GoogleTranslate = () => {
    useEffect(() => {
        const googleTranslateElementInit = () => {
            new (window as any).google.translate.TranslateElement({
                pageLanguage: 'es',
                includedLanguages: 'es,en',
            }, 'google_translate_element');
        }
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);
    const resetTranslation = () => {
        const iframe = document.querySelector<HTMLIFrameElement>('iframe.skiptranslate');
        const iframeDocument = iframe?.contentDocument || iframe?.contentWindow?.document;
        const restoreButton = iframeDocument?.querySelector<HTMLButtonElement>('button[id=":1.restore"]');

        if (restoreButton) {
            restoreButton.click();
        } else {
            location.reload();
        }
    }

    useEffect(() => {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    const googTransEl = document.querySelector<HTMLDivElement>('#google_translate_element');
                    const googGtTt = document.querySelector<HTMLDivElement>('#goog-gt-tt');
                    const spanBanner = googTransEl?.querySelector<HTMLSpanElement>('span');
                    const skipTranslate = document.querySelector<HTMLIFrameElement>('iframe.skiptranslate');
                    const gadgetDiv = document.querySelector('.skiptranslate.goog-te-gadget');
                    const selectLang = gadgetDiv?.querySelector<HTMLDivElement>('select');
                    if (gadgetDiv) {
                        const textNodes = Array.from(gadgetDiv.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);

                        textNodes.forEach(node => {
                            if (node.nodeValue?.includes("Con la tecnología de")) {
                                node.remove();
                            }
                        });
                    }
                    if (selectLang) {
                        selectLang.style.backgroundColor = '#50d743';
                        selectLang.style.color = '#000';
                        selectLang.style.margin = '0';
                        selectLang.style.width = '77px';
                        selectLang.style.padding = '1px 3px';
                        selectLang.style.borderRadius = '5px';

                        const defaultOption = selectLang.querySelector('option[value=""]');
                        if (defaultOption) {
                            defaultOption.textContent = "Idioma";
                        }
                    }
                    if (googTransEl) {
                        googTransEl.style.top = '0';
                        googTransEl.style.right = '0';
                        googTransEl.style.zIndex = '999999';
                        googTransEl.style.margin = '2px 4px';
                    }
                    if (googGtTt) {
                        googGtTt.style.display = 'none';
                    }
                    if (spanBanner) {
                        spanBanner.style.display = 'none';
                    }
                    if (skipTranslate) {
                        skipTranslate.style.display = 'none';
                        document.body.style.overflow = '';
                        document.body.style.top = '';
                        document.body.style.position = '';
                        document.body.style.minHeight = '';
                    }
                }
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });


    }, []);

    if (isIOS) {
        return null;
    }

    return (
        <>
            <div className='flex flex-row justify-end gap-0.5 absolute top-0 right-0 bg-white w-full z-[99999] px-2'>
                <button onClick={resetTranslation}
                    className='text-[10pt] font-normal font-[arial] text-black underline py-[1px] px-1'>
                    Original
                </button>
                <div id="google_translate_element" />
            </div>
            <Script
                src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                strategy="lazyOnload"
            />
        </>
    )
}

export default GoogleTranslate