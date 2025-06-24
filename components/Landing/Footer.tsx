import CurveUp from '@/components/Landing/CurveUp';

const LandingFooter = () => {
  return (
    <footer>
      <CurveUp />
      <div className="bg-[#13263C] pr-[10%] pl-[10%] pb-5 pt-5">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
          <div>
            <div className="border border-dashed border-gray-700 p-5 w-full">
              <h3 className="text-xl mb-2 font-semibold text-white">
                Would you need a Custom RAG?
              </h3>

              <p className="text-gray-700">
                Email us to{' '}
                <a
                  className="text-gray-600 hover:text-primary-active"
                  href={'mailto:lexrag.tech@gmail.com'}
                >
                  lexrag.tech@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-start gap-5 text-gray-600">
            <p className="text-lg">Stay connected</p>
            {[
              {
                name: 'Facebook',
                iconUrl: '/media/icons/facebook.svg',
                link: '/',
              },
              { name: 'Github', iconUrl: '/media/icons/github.svg', link: '/' },
              {
                name: 'Linkedin',
                iconUrl: '/media/icons/linkedin.svg',
                link: '/',
              },
            ].map((item, index) => (
              <div
                className="flex justify-center items-center gap-2"
                key={index}
              >
                <img src={item.iconUrl} alt={item.link} />
                <a
                  className="hover:text-primary"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#13263C] h-[100px] border-t border-dashed border-gray-700 text-white">
        <div className="h-full flex justify-start items-center pl-[10%] pr-[10%]">
          {/* <img className="max-h-[20px] mr-5" src="/media/lexrag-logo-dark.svg"
                         alt="lexrag logo"/> */}
          <p className="text-gray-700">© 2025 LEXRAG PTE LTD</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
