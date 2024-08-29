'use client'
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
    TelegramShareButton,
    TelegramIcon,
} from 'react-share';
interface SocialShareButtonsProps {
    url: string;
    title: string;
}
const SocialShareButtons = ({ url, title }: SocialShareButtonsProps) => {
    return (
        <div className="flex space-x-4">
            <FacebookShareButton url={'https://observatorio.uss.edu.pe/'+url} title={title}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton url={'https://observatorio.uss.edu.pe/'+url} title={title}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>

            <LinkedinShareButton url={'https://observatorio.uss.edu.pe/'+url} title={title}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <WhatsappShareButton url={'https://observatorio.uss.edu.pe/'+url} title={title}>
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            <TelegramShareButton url={'https://observatorio.uss.edu.pe/'+url} title={title}>
                <TelegramIcon size={32} round />
            </TelegramShareButton>
        </div>
    );
};

export default SocialShareButtons;