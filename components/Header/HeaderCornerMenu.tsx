'use client';

import GetinButton from './GetinButton';

const HeaderCornerMenu = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
                <div className="h-[40%]" />
                <GetinButton />
            </div>
        </div>
    );
};

export default HeaderCornerMenu;
