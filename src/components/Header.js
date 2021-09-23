import React from "react";

export default function Header() {
    return (
        <>
            <h1 className="breadcrumbs-title">Breadcrumbs</h1>
            <h5 className="breadcrumbs-subtitle">Help keep our ant alive!</h5>
            <div className="user-instructions">
                <p>Each step, the ant will move forward.</p>
                <p>
                    If it sees white, it will turn right, and if it sees grey,
                    it will turn left.
                </p>
                <p>
                    Try to avoid the red patches, and guide the ant towards the
                    goal!
                </p>
            </div>
        </>
    );
}
