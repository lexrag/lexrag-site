import UserIcon from "@/components/DropdownMenu/UserIcon";

const HeaderCornerMenu = () => {
    return (
        <div className="flex items-center gap-8">
            <div className='h-[40%] border-r-2 border-gray-200' />
            <div className="tab">
                <UserIcon />
            </div>
        </div>

    )
}

export default HeaderCornerMenu;
