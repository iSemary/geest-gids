import Image from "next/image";
import Link from "next/link";
import React from "react";
import CourseDetailsTemplate from "./Course/CourseDetailsTemplate";

export default function CoursePageTemplate({ course, containerClass }) {
    return (
        <CourseDetailsTemplate
            course={course}
            containerClass={containerClass}
        />
    );
}