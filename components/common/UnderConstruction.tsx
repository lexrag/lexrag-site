import Link from 'next/link';
import { Container } from '@/components/common/container';

interface UnderConstructionProps {
    title?: string;
    description?: string;
    primaryHref?: string;
    primaryLabel?: string;
    secondaryHref?: string;
    secondaryLabel?: string;
    badgeText?: string;
    className?: string;
}

export default function UnderConstructionSection({
    title = 'This page is under construction',
    description = "We’re polishing this section. In the meantime, explore our technology or get started for free.",
    primaryHref = '/technology',
    primaryLabel = 'Explore Technology',
    secondaryHref = 'https://app.lexrag.com/auth/signup',
    secondaryLabel = 'Register Free',
    badgeText = 'Coming soon',
    className = '',
}: UnderConstructionProps) {
    return (
        <section className={`mt-[200px] mb-[120px] ${className}`}>
            <Container>
                <div className="max-w-[760px] mx-auto text-center">
                    <span className="inline-block text-[12px] md:text-[13px] px-3 py-1 rounded-full border border-phase-green/40 bg-phase-green/10 text-midnight-core mt-30 mb-10">
                        {badgeText}
                    </span>
                    <h2 className="text-midnight-core text-[32px] md:text-[48px]/[110%] font-medium mb-3">{title}</h2>
                    <p className="text-midnight-core/70 text-base md:text-lg mb-6">{description}</p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Link
                            className="text-axis-indigo bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-colors hover:opacity-85"
                            href={primaryHref}
                        >
                            {primaryLabel}
                        </Link>
                        <Link
                            className="flex items-center gap-[6px] py-2 font-medium text-base px-[36px] border border-phase-green rounded-full hover:bg-phase-green transition-colors"
                            href={secondaryHref}
                        >
                            <span className="text-midnight-core hover:text-axis-indigo">{secondaryLabel}</span>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}


