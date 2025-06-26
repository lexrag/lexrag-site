interface TeamMemberProps {
    id?: string;
    photoUrl: string;
    name: string;
    position: string;
    link?: string;
}

const TeamMember = (props: TeamMemberProps) => {
    return (
        <div id={props.id} className="text-center">
            <div
                className="octagon mx-auto mb-5 flex w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] bg-no-repeat bg-contain bg-center"
                style={{ backgroundImage: `url(${props.photoUrl})` }}
            ></div>

            <div className="mb-0">
                <a href={props.link} className="text-gray-900 font-semibold hover:text-primary text-xl">
                    {props.name}
                </a>
                <div className="text-gray-500 text-base mt-1">{props.position}</div>
            </div>
        </div>
    );
};

export default TeamMember;
