import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Images
import Logo from "../assets/images/Dashboard-img/logo.svg";
import Earning from "../assets/images/Navbar-img/white-voucher.svg";
import Reward from "../assets/images/Navbar-img/reward.svg";
import Home from "../assets/images/Navbar-img/home.svg";
import User from "../assets/images/Navbar-img/User-60.svg";

import { GoBell } from 'react-icons/go';
import { IoColorPalette, IoSettingsOutline } from 'react-icons/io5';
import { ImRoad } from 'react-icons/im';
import { PiPencilSimple, PiUploadSimpleBold } from 'react-icons/pi';
import { BiSolidCheckShield } from 'react-icons/bi';
import { HiOutlineLogout } from 'react-icons/hi';
import { FaLanguage } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Button from './button';

const NavBar = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log('Submitted Data:', data);
    };
    return (
        <>
            <Navbar collapseOnSelect expand="lg" sticky="top" className="bg-light-blue-color pt-4">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={Logo} alt="Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto box-shadow bg-white rounded-pill px-4 py-lg-0 py-3 mt-md-3 justify-content-center flex-wrap">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `nav-link text-blue-color d-flex align-itmes-center justify-content-center my-2 font-14 montserrat-semibold me-3 px-3 ${isActive ? 'active-nav' : ''}`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <img src={Home} alt="Active" className="active-icon me-2" />}
                                        <span> Dashboard</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/referral"
                                className={({ isActive }) =>
                                    `nav-link text-blue-color d-flex align-itmes-center justify-content-center my-2 font-14 montserrat-semibold me-3 px-3 ${isActive ? 'active-nav' : ''}`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <img src={Reward} alt="Active" className="active-icon me-2" />}
                                        <span> Referrals & Rewards</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/earning"
                                className={({ isActive }) =>
                                    `nav-link text-blue-color d-flex align-itmes-center justify-content-center my-2 font-14 montserrat-semibold px-3 ${isActive ? 'active-nav' : ''}`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <img src={Earning} alt="Active" className="active-icon me-2" />}
                                        <span> Earning & Redemptions</span>
                                    </>
                                )}
                            </NavLink>
                        </Nav>
                        <Nav className='d-flex align-items-center justify-content-center gap-3 flex-row mt-3 mt-lg-0 ms-auto'>
                            <Nav.Link href="#deets" className='font-32 text-blue-color'><GoBell /></Nav.Link>
                            <Nav.Link eventKey={2} href="#memes" className='font-32 text-blue-color'><IoSettingsOutline /></Nav.Link>

                            <div className="dropdown">
                                <button
                                    className="btn nav-link border-0 bg-transparent p-0"
                                    id="userDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img src={User} alt="User" className='user-icon' />
                                </button>

                                <ul className="dropdown-menu dropdown-menu-end border-0 border-radius-16 custom-dropdown-width p-0" aria-labelledby="userDropdown">
                                    <li className="profile-header px-3 py-2">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <img
                                                src={User}
                                                alt="avatar"
                                                className="rounded-circle"
                                                width="40"
                                            />
                                            <button className="ms-3 schedule-right-side p-2 border-0 rounded-3 d-flex align-items-center"
                                                data-bs-toggle="offcanvas"
                                                data-bs-target="#profileEditPanel"
                                            >
                                                <PiPencilSimple className='font-20 text-blue-color' />
                                            </button>
                                        </div>
                                        <h6 className="mb-0 text-blue-color font-20 montserrat-medium">Adity  Sharma</h6>
                                    </li>
                                    {/* <li><hr className="dropdown-divider" /></li> */}
                                    <li className='border-bottom  pt-3 px-3'>
                                        <button className="dropdown-item d-flex align-items-center gap-2 py-3">
                                            <FaLanguage className='font-20 text-border-gray-color' />
                                            <span className='text-blue-color font-16 montserrat-medium'>Languages</span>
                                        </button>
                                    </li>
                                    <li className='border-bottom px-3'>
                                        <button className="dropdown-item d-flex align-items-center gap-2 py-3">
                                            <IoColorPalette className='font-20 text-border-gray-color' />
                                            <span className='text-blue-color font-16 montserrat-medium'>Themes</span>
                                        </button>
                                    </li>
                                    <li className='border-bottom px-3'>
                                        <button className="dropdown-item d-flex align-items-center gap-2 py-3">
                                            <BiSolidCheckShield className='font-20 text-border-gray-color' />
                                            <span className='text-blue-color font-16 montserrat-medium'>Security</span>
                                        </button>
                                    </li>
                                    <li className='border-bottom px-3'>
                                        <button className="dropdown-item d-flex align-items-center gap-2 py-3">
                                            <HiOutlineLogout className='font-20 text-border-gray-color' />
                                            <span className='text-blue-color font-16 montserrat-medium'>Logout</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
            {/* Edit  Right Side Panel */}
            <div
                className="offcanvas px-3 offcanvas-end bg-light-blue-color right-sidepanel"
                tabIndex="-1"
                id="profileEditPanel"
                aria-labelledby="profileEditPanelLabel"
            >
                <div className="offcanvas-header">
                    <p className="offcanvas-title font-20 montserrat-semibold text-blue-color mb-0" id="profileEditPanelLabel">Edit Admin Profile</p>
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <p className='font-14 montserrat-regular sidepanel-gray-text lh-1 px-3'>Make changes to the admin’s name, contact <br /> info, or other profile details.</p>

                <div className="offcanvas-body">
                    <form onSubmit={handleSubmit(onSubmit)} className='row'>
                        <div className="mb-3 col-lg-12">
                            <label className="form-label text-blue-color font-12 montserrat-semibold">Name</label>
                            <input type="text" className="form-control font-14 montserrat-medium text-blue-color border-0" placeholder="Enter name"
                                {...register('name', { required: 'Name is required' })}
                            />
                            {errors.name && <small className="text-danger">{errors.name.message}</small>}

                        </div>
                        <div className="mb-3 col-lg-12">
                            <label className="form-label text-blue-color font-12 montserrat-semibold">Mobile Number</label>
                            <input type="number" className="form-control font-14 montserrat-medium text-blue-color border-0" placeholder="Enter Mobile No."
                                {...register('mobile', { required: 'Mobile number is required' })}
                            />
                            {errors.mobile && <small className="text-danger">{errors.mobile.message}</small>}

                        </div>
                        <div className="mb-3 col-lg-12">
                            <label className="form-label text-blue-color font-12 montserrat-semibold">Email</label>
                            <input type="email" className="form-control font-14 montserrat-medium text-blue-color border-0" placeholder="Enter Email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Invalid email address'
                                    }
                                })}
                            />
                            {errors.email && <small className="text-danger">{errors.email.message}</small>}

                        </div>
                        <div className="mb-3 col-lg-12">
                            <label className="form-label text-blue-color font-12 montserrat-semibold">Password</label>
                            <input type="password" className="form-control font-14 montserrat-medium text-blue-color border-0" placeholder="Enter Password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters'
                                    }
                                })}
                            />
                            {errors.password && <small className="text-danger">{errors.password.message}</small>}

                        </div>

                        <div className='mb-4 col-lg-12'>
                            <label className="form-label text-blue-color font-12 montserrat-semibold">Upload Picture</label>
                            <label class="upload-box d-flex text-center bg-light-white-3-color p-2 rounded-3 text-blue-color font-12 montserrat-medium">
                                <div class="upload-icon"><PiUploadSimpleBold className='font-16 me-3' /></div>
                                Upload
                                <input type="file" id="formFile" />
                            </label>
                        </div>
                        <Button btn_class={"text-white px-5 bg-blue-color w-100 border-0"}
                            btn_title={"Save Changes"}
                        />
                        {/* <button type='submit' className="rounded-pill font-14 montserrat-medium border-0 text-white bg-blue-color px-3 w-100 py-2">Save Changes</button> */}
                    </form>
                </div>
            </div>
        </>
    );
};

export default NavBar;
