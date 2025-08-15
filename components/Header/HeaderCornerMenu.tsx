'use client';

import GetinButton from './GetinButton';

const HeaderCornerMenu = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
                <div className="h-[40%] border-r-2 border-gray-200" />
                <div className="tab">
                    <GetinButton />
                </div>
            </div>
        </div>
    );
};

export default HeaderCornerMenu;
