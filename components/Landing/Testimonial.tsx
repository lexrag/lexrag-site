interface TestimonialProps {
    rating: number;
    title: React.ReactNode;
    feedback: string;
    avatar: string;
    name: string;
    role: string;
    link?: string;
}

const Testimonial = ({ rating, title, feedback, avatar, name, role, link = '#' }: TestimonialProps) => {
    return (
        <div className="flex flex-col justify-between lg:h-full px-10 lg:px-0 lg:pr-10 mb-15 lg:mb-0">
            <div className="mb-7">
                <div className="flex mb-6">
                    {Array.from({ length: rating }).map((_, i) => (
                        <div key={i} className="mr-2 text-yellow-500">
                            <i className="ki-duotone ki-star"></i>
                        </div>
                    ))}
                </div>

                <div className="text-xl font-semibold text-gray-900 mb-3">{title}</div>

                <div className="text-gray-500 text-lg">{feedback}</div>
            </div>

            <div className="flex items-center">
                <div className="w-12 h-12 rounded-full mr-5 overflow-hidden">
                    <img src={avatar} alt={name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                    <a href={link} className="text-gray-900 font-semibold hover:text-blue-500 text-base">
                        {name}
                    </a>
                    <span className="text-gray-500 block">{role}</span>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
