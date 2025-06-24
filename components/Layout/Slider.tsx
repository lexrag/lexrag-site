import {PropsWithChildren, useEffect} from "react";
import { tns } from "tiny-slider";
import "tiny-slider/dist/tiny-slider.css";

const Slider = ({children}: PropsWithChildren) => {
    useEffect(() => {
        tns({
            container: ".tns-carousel",
            items: 1,
            slideBy: "page",
            nav: false,
            autoplayTimeout: 18000,
            speed: 2000,
            prevButton: "#slider_prev",
            nextButton: "#slider_next",
        });
    }, []);

    return (
        <div className="relative">
            <div className="tns-carousel flex overflow-hidden">
                {children}
            </div>

            <button
                id="slider_prev"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200"
            >
                ◀
            </button>
            <button
                id="slider_next"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200"
            >
                ▶
            </button>
        </div>
    );
};

export default Slider;
