import React from "react";
import { AiFillStar } from "react-icons/ai";

export default function InstructorStarRate({ rate }) {
    return (
        <div className="stars-rate">
            <span className="text-muted"><AiFillStar size={20} className="star-icon active" /> {rate.average}</span>
        </div>
    );
}
