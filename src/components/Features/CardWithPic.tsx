import { PropsWithChildren } from "react";
import Link from "next/link";

interface CardWithPicProps extends PropsWithChildren {
    title?: string;
    description?: string;
    imgSrc?: string;
    link?: string;
    maxImgHeight?: number;
    clasName?: string;
}

const CardWithPic = ({ 
    title, 
    description, 
    imgSrc, 
    link,
    clasName,
    children 
}: CardWithPicProps) => {
    return (
        <div className="card">
            <div className="card-body px-10 py-7.5 lg:pr-12.5">
                <div className="flex flex-wrap md:flex-nowrap items-center gap-6 md:gap-10">
                    <div className="flex flex-col items-start gap-3">
                        {title && <h2 className="text-1.5xl font-medium text-gray-900">{title}</h2>}
                        {description && <p className="text-sm text-gray-800 leading-5.5 mb-2.5">{description}</p>}
                        
                        {children && (
                            <div className="mt-4">
                                {children}
                            </div>
                        )}

                        {link && (
                            <Link href={link} className="text-primary hover:underline mt-4">
                                Learn More
                            </Link>
                        )}
                    </div>
                    
                    {imgSrc && (
                        <>
                            <img 
                                src={imgSrc} 
                                className={`dark:hidden ${clasName}`}
                                alt={title} 
                            />
                            <img 
                                src={imgSrc} 
                                className={`light:hidden ${clasName}`}
                                alt={title} 
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardWithPic;