import CurveDown from '@/components/Landing/CurveDown';
import CurveUp from '@/components/Landing/CurveUp';

const Statistics = () => {
  const stats = [
    {
      icon: 'ki-duotone ki-element-11',
      value: '700+',
      label: 'Known Companies',
    },
    {
      icon: 'ki-duotone ki-chart-pie-4',
      value: '80K+',
      label: 'Statistic Reports',
    },
    {
      icon: 'ki-duotone ki-basket',
      value: '35M+',
      label: 'Secure Payments',
    },
  ];

  return (
    <>
      <CurveUp />

      <div className="bg-[#13263C] min-h-[60vh]">
        <div className="text-center mb-10">
          <h3 className="text-white text-2xl md:text-4xl pt-5 mb-5 font-semibold">
            We Simplify Your Work
          </h3>

          <p className="text-gray-600">
            Save thousands to millions of bucks by using single tool <br />
            for different amazing and great useful admin
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:pr-[14%] lg:pl-[14%]">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="m-auto flex flex-col items-center justify-center h-52 w-52 lg:h-64 lg:w-64 bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: "url('/media/images/octagon.svg')" }}
            >
              <i className={`text-white text-4xl mb-3 ${stat.icon}`}></i>
              <div className="text-2xl font-semibold text-white flex items-center justify-center">
                {stat.value}
              </div>
              <span className="text-gray-600 text-md text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="text-md md:text-2xl font-semibold text-gray-500 text-center pt-5 pb-3">
          <span className="text-4xl leading-none text-gray-700">“</span>
          When you care about your topic, you’ll write about it in a
          <br />
          <span className="text-gray-700 mr-1">more powerful</span>, emotionally
          expressive way
          <span className="text-4xl leading-none text-gray-700">“</span>
        </div>
      </div>

      <CurveDown />
    </>
  );
};

export default Statistics;
