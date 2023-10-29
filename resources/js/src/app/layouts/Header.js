import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineClear, AiOutlineShoppingCart } from "react-icons/ai";
import Logo from "/public/assets/images/logo.svg";
import { useAuth } from "../components/hooks/AuthProvider";
import { Button, Dropdown } from "react-bootstrap";
import axiosConfig from "../components/axiosConfig/axiosConfig";
import { Token } from "../components/utilities/Authentication/Token";

const Header = () => {
    const { user } = useAuth();
    const handleLogout = (e) => {
        axiosConfig.post("/auth/logout").then((response) => {
            Token.explode();
        });
    };
    return (
        <header className="main-header">
            <nav className="row align-items-center">
                <div className="col-2">
                    <div className="logo flex-center">
                        <Link href="/" className="logo-title flex-center">
                            <Image
                                src={Logo}
                                width={35}
                                height={35}
                                alt="logo"
                            />
                            <span className="ms-1">
                                {process.env.NEXT_PUBLIC_APP_NAME}
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="col-4">
                    <div className="search-container">
                        <input
                            type="text"
                            className="nav-search"
                            placeholder="Search for courses, instructors, career, and categories..."
                        />
                        <div className="search-results">
                            <ul>
                                <li>
                                    <div>PHP course</div>
                                    <div>
                                        <AiOutlineClear />
                                    </div>
                                </li>
                                <li>
                                    <div>PHP course</div>
                                    <div>
                                        <AiOutlineClear />
                                    </div>
                                </li>
                                <li>
                                    <div>PHP course</div>
                                    <div>
                                        <AiOutlineClear />
                                    </div>
                                </li>
                                <li>
                                    <div>PHP course</div>
                                    <div>
                                        <AiOutlineClear />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <ul className="nav-links my-0">
                        <li>
                            <Link href="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/categories" className="nav-link">
                                Categories
                            </Link>
                        </li>
                        <li>
                            <Link href="/cart" className="nav-link cart-link">
                                <AiOutlineShoppingCart size={25} />
                            </Link>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <Link
                                        href="my-courses"
                                        className="nav-link"
                                    >
                                        My Courses
                                    </Link>
                                </li>
                                <li className="d-flex">
                                    <Dropdown className="split-button">
                                        <Link
                                            variant="primary"
                                            href="/profile"
                                            className="btn btn-primary split-main-button"
                                        >
                                            Name
                                        </Link>
                                        <Dropdown.Toggle
                                            split
                                            variant="primary"
                                        />
                                        <Dropdown.Menu className="split-sub-buttons">
                                            <Dropdown.Item eventKey="1">
                                                <Link className="no-link" href="/settings">
                                                    Settings
                                                </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="2">
                                                <Link className="no-link" href="/my-courses">
                                                    My Courses
                                                </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item
                                                eventKey="4"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                                <li className="bordered">
                                    <Link href="/register" className="nav-link">
                                        Create account
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
