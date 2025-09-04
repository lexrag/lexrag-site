import LiquidGlass from '../liquid-glass';
import Tilt3D from '../tilt3d/Tilt3D';
import { LinkPrimary } from '../ui/link-primary';

export default function Quotation({ className }: { className?: string }) {
    return (
        <div className={`px-4 ${className}`}>
            <Tilt3D className="group block" maxTilt={10} perspective={1100} scale={1.03} radius={24}>
                <LiquidGlass
                    className="group max-w-[600px]"
                    centered={false}
                    compact
                    displacementScale={0}
                    blurAmount={0.01}
                    saturation={200}
                    aberrationIntensity={2}
                    elasticity={0.05}
                    cornerRadius={30}
                    mode="standard"
                    padding="8px 16px"
                    style={{
                        boxShadow: 'none',
                        filter: 'none',
                    }}
                >
                    <div className="md:p-10 p-3">
                        <h4
                            className="text-[20px]/[21px] md:text-[32px]/[120%] mt-3 md:mt-6 max-w-[692px] text-midnight-core font-normal"
                            style={{
                                fontFamily: 'Instrument Sans',
                            }}
                        >
                            “Confidence in technology grows through experience: by testing, integrating, and relying on
                            it, you discover that security and usability go hand in hand.”
                        </h4>
                        <p className="text-midnight-core mt-5 text-sm md:text-base">A. Author</p>
                    </div>
                </LiquidGlass>
            </Tilt3D>

            <div className="mt-13">
                <LinkPrimary href="/technology">Get started</LinkPrimary>
            </div>
        </div>
    );
}
