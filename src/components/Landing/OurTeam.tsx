import TeamMember from "@/components/Landing/TeamMember";

const OurTeam = () => {
    const members = [
        {
            id: 'member1',
            photoUrl: '/media/images/guy.jpg',
            name: 'Alice Wayde',
            position: 'Marketing Manager',
            link: '#',
        },
        {
            id: 'member2',
            photoUrl: '/media/images/guy.jpg',
            name: 'John Doe',
            position: 'Product Manager',
            link: '#',
        },
        {
            id: 'member3',
            photoUrl: '/media/images/guy.jpg',
            name: 'Jane Roe',
            position: 'Creative Director',
            link: '#',
        },
    ];

    return (
        <>
            <div className="text-center mb-10">

                <h3 className="text-2xl md:text-4xl mb-5 font-semibold">
                    Our Great Team
                </h3>

                <p className="text-gray-600">
                    It’s no doubt that when a development takes longer to complete,<br/> additional costs to
                    integrate and test each extra feature creeps up and haunts most of us.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10 md:mb-20"></div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-[50px] md:gap-[100px] space-x-4">
                {members.map((member) => (
                    <TeamMember
                        key={member.id}
                        id={member.id}
                        photoUrl={member.photoUrl}
                        name={member.name}
                        position={member.position}
                        link={member.link}
                    />
                ))}
            </div>
        </>
    )
}

export default OurTeam;
