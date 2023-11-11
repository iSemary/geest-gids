"use client";
import React, { useEffect, useRef, useState } from "react";
import DashboardTemplate from "../../../../Templates/DashboardTemplate";
import DashboardTitle from "../../../../layouts/dashboard/DashboardTitle";
import axiosConfig from "../../../../components/axiosConfig/axiosConfig";
import toastAlert from "../../../../components/utilities/Alert";
import FormEditor from "../../components/FormEditor";
export default function editCourse({ params }) {
    const [course, setCourse] = useState({});
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    /** Listen on param slug changes */
    useEffect(() => {
        // Get Course Details
        axiosConfig
            .get(`courses/${params.slug}`)
            .then((response) => {
                setCourse(response.data.data.course);
            })
            .catch(({ response }) => {
                toastAlert(response.data.message, "error");
            });
    }, [params.slug]);

    /** Calls update api with the updated data */
    const handleSubmitCourse = (e) => {
        e.preventDefault();
        setFormLoading(true);
        // Prepare data
        const formData = new FormData();
        for (const [key, value] of Object.entries(course)) {
            const formattedValue =
                value instanceof Date
                    ? value.toLocaleDateString("en-CA", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                      })
                    : value;
            formData.append(key, formattedValue);
        }

        formData.append("_method", "PUT");
        axiosConfig
            .post(`courses/${params.slug}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                setFormLoading(false);
                toastAlert(response.data.message, "success");
            })
            .catch(({ response }) => {
                setFormLoading(false);
                toastAlert(response.data.message, "error");
            });
    };

    return (
        <DashboardTemplate>
            <DashboardTitle
                title={`Update "${params.slug}" course`}
                path={[
                    { label: "Courses", url: "/dashboard/courses" },
                    { label: params.slug },
                    { label: "Edit" },
                ]}
            />
            <div>
                <FormEditor
                    course={course}
                    setCourse={setCourse}
                    setThumbnailImage={setThumbnailImage}
                    handleSubmitCourse={handleSubmitCourse}
                    formLoading={formLoading}
                    setFormLoading={setFormLoading}
                />

                <hr />
                <div className="col-md-3">
                    <h5>Course Thumbnail Image</h5>
                    <img
                        src={
                            thumbnailImage
                                ? thumbnailImage
                                : "https://placehold.co/600x400/EEE/31343C"
                        }
                        className="thumbnail-image course"
                        alt="thumbnail"
                    />
                </div>
            </div>
        </DashboardTemplate>
    );
}
