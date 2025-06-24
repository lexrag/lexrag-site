"use client"

import Slider from "@/components/Layout/Slider";

const HowItWorksSlider = () => {
    return (
        <Slider>
            {[
                "/media/images/placeholder.jpg",
                "/media/images/placeholder.jpg",
                "/media/images/placeholder.jpg",
                "/media/images/placeholder.jpg",
            ].map((src, index) => (
                <div key={index} className="text-center px-5 pt-5 lg:pt-10">
                    <img
                        src={src}
                        className="rounded-lg shadow-lg max-h-[650px] w-auto mx-auto"
                        alt={`Slide ${index + 1}`}
                    />
                </div>
            ))}
        </Slider>
    )
}

export default HowItWorksSlider;
