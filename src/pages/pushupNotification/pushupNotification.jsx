import React, { useState } from 'react'
import NavBar from '../../components/navbar';
import { Nav } from 'react-bootstrap';
import { IoIosArrowForward } from 'react-icons/io';

// Images
import Filter from "../../assets/images/Dashboard-img/FadersHorizontal.svg";
import { useForm } from 'react-hook-form';
import { PiPencilSimple, PiTrashSimple, PiPauseCircle, PiCopySimpleLight } from 'react-icons/pi';
import Button from '../../components/button';
// Import Json
const NotificationData = [
    {
        title: "You’ve earned A new star!",
        message: "Complete 1 more referral to unlock your next galaxy.",
    },
    {
        title: "You’ve earned A new star!",
        message: "Complete 1 more referral to unlock your next galaxy.",
    },
    {
        title: "You’ve earned A new star!",
        message: "Complete 1 more referral to unlock your next galaxy.",
    },
    {
        title: "You’ve earned A new star!",
        message: "Complete 1 more referral to unlock your next galaxy.",
    },
]
const PushupNotification = () => {
    const [activeTab, setActiveTab] = useState('tab1');
    const {
        register,
        // handleSubmit,
        // formState: { errors },
    } = useForm();
    return (
        <>
            <NavBar />
            <div className='bg-light-blue-color py-5 min-vh-100'>
                <div className='container mb-5'>
                    <div>
                        <p className='mb-0 text-blue-color montserrat-semibold font-24'>Pushup  Notification</p>
                        <p className='mb-0 text-blue-color montserrat-medium font-12'>Create, schedule, and manage push notifications to engage users at the right moments.</p>
                    </div>
                </div>
                <div className='nav-tab-bg d-flex align-items-center px-5'>
                    <Nav className='container' variant="underline" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
                        <Nav.Item>
                            <Nav.Link eventKey="tab1" className='font-16 montserrat-semibold text-border-gray-color'>Create new notification</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="tab2" className='font-16 montserrat-semibold text-border-gray-color'>
                                Existing Notification list
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <div className='bg-light-white-1-color filter-btn px-3 py-2 d-flex justify-content-between align-items-center me-5'>
                        <p className='mb-0 text-blue-color montserrat-medium font-14 me-2'>Filter </p>
                        <img src={Filter} alt="Filter" />
                    </div>
                </div>
                <div className='container py-5'>
                    {/* Tab Content */}

                    {/* tab 1 (Exclusive Offer) Start Here */}
                    {activeTab === 'tab1' &&
                        <div className='row gy-3'>
                            <div className='col-lg-7'>
                                <p className='font-14 montserrat-medium text-border-gray-color'>Create a new notification by filling the details below</p>
                                <form className='row'>
                                    <div className='col-lg-6 mb-3'>
                                        <label className="form-label font-16 montserrat-semibold text-blue-color">Title for the notification</label>
                                        <input
                                            type="text"
                                            className="form-control rounded-3 font-14 montserrat-medium border-0 py-2 "
                                            {...register('notifyTitle')}
                                        />
                                    </div>
                                    <div className='col-lg-6 mb-3'>
                                        <label className="form-label font-16 montserrat-semibold text-blue-color">Message</label>
                                        <input
                                            type="text"
                                            className="form-control rounded-3 font-14 montserrat-medium border-0 py-2 "
                                            {...register('message')}
                                        />
                                    </div>
                                    <div className='col-lg-4 mb-3'>
                                        <label className="form-label font-16 montserrat-semibold text-blue-color">Button Text</label>
                                        <input
                                            type="text"
                                            className="form-control rounded-3 font-14 montserrat-medium border-0 py-2 "
                                            {...register('buttonText')}
                                        />
                                    </div>

                                    <div className='col-lg-4 mb-3'>
                                        <label className="form-label font-16 montserrat-semibold text-blue-color">Button URL</label>
                                        <input
                                            type="text"
                                            className="form-control rounded-3 font-14 montserrat-medium border-0 py-2 "
                                            {...register('buttonUrl')}
                                        />
                                    </div>
                                    <div className='col-lg-4 mb-4'>
                                        <label className="form-label font-16 montserrat-semibold text-blue-color">Button URL</label>
                                        <input
                                            type="text"
                                            className="form-control rounded-3 font-14 montserrat-medium border-0 py-2 "
                                            {...register('buttonUrl')}
                                        />
                                    </div>
                                    {/* <hr  className='text-white'/> */}
                                    <p className='font-14 montserrat-medium text-border-gray-color border-top border-white pt-4'>Select all whom you want to send this to</p>
                                    <div className='col-lg-4 mb-4'>
                                        <label className="form-label font-16 montserrat-semibold text-blue-color">Select from segment</label>
                                        <select class="form-select border-0" aria-label="Default select example">
                                            <option selected>All</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    <div className='col-lg-4 mb-4'>
                                        <label className="form-label font-16 montserrat-semibold text-blue-color">Specific user</label>
                                        <select class="form-select border-0" aria-label="Default select example">
                                            <option selected>Select/ type user name</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center border-top border-white pt-4'>
                                        <p className='font-14 montserrat-medium text-border-gray-color'>Schedule for later in advance</p>
                                        <p className='text-blue-color font-14 montserrat-medium'>View all scheduled <IoIosArrowForward className='font-20' />
                                        </p>
                                    </div>
                                    <div className='col-lg-4 mb-4'>
                                        <label className="form-label font-16 montserrat-semibold text-blue-color">Button URL</label>
                                        <input
                                            type="date"
                                            className="form-control rounded-3 text-blue-color font-14 montserrat-medium border-0 py-2"
                                            {...register('date')}
                                        />
                                    </div>
                                    <div className='col-lg-4 mb-4'>
                                        <label className="form-label font-16 montserrat-semibold text-blue-color">Button URL</label>
                                        <input
                                            type="time"
                                            className="form-control rounded-3 text-blue-color font-14 montserrat-medium border-0 py-2"
                                            {...register('time')}
                                        />
                                    </div>
                                    <div className='col-lg-6 mt-3'>
                                        <Button
                                            btn_class={"text-white bg-blue-color border-0"}
                                            btn_title={"Save & Send"}
                                        />
                                    </div>
                                </form>
                            </div>

                            <div className='col-lg-5 d-flex justify-content-center'>
                                <div className='pushup-preview-box w-100 bg-white p-3 border-radius-16 d-flex align-items-center justify-content-center'>
                                    <p className='text-blue-color font-24 montserrat-medium'>Screen Preview</p>

                                </div>
                            </div>

                        </div>
                    }

                    {/* Tab 2 Content (Exciting Prizes) Start Here */}
                    {activeTab === 'tab2' &&
                        <div className='row gy-3'>
                            <div className='col-lg-7'>
                                <div className='table-responsive'>
                                    <table className="table text-center notification-table earning-table middle-align border-radius-16">
                                        <thead className='position-sticky top-0'>
                                            <tr>
                                                <th scope="col" className='font-16 montserrat-medium text-blue-color ps-3 text-start py-3'>
                                                    Notification Titles
                                                </th>
                                                <th scope="col" className='font-16 montserrat-medium text-blue-color ps-5 py-3'>
                                                    Message
                                                </th>
                                                <th scope="col" className='font-16 montserrat-medium text-blue-color ps-5 py-3'>
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NotificationData.map((item, index) => (
                                                <tr key={index}>
                                                    <td className='font-14 montserrat-medium ps-3 text-capitalize text-start py-3'>
                                                        {item.title}
                                                    </td>
                                                    <td className='font-14 montserrat-medium py-3'>{item.message}</td>
                                                    <td className='font-14 montserrat-medium py-3'>
                                                        <div className='d-flex justify-content-center align-items-center gap-3'>
                                                            <button className='icon-btn border-0 width-32 height-32 push-edit-icon rounded-circle'>
                                                                <PiPencilSimple className='font-16' />
                                                            </button>
                                                            <button className='icon-btn border-0 width-32 height-32 copy-icon rounded-circle'>
                                                                <PiCopySimpleLight className='font-16' />
                                                            </button>
                                                            <button className='icon-btn border-0 width-32 height-32 pause-btn rounded-circle'>
                                                                <PiPauseCircle className='font-16' />
                                                            </button>
                                                            <button className='icon-btn border-0 width-32 height-32 reward-delete-icon rounded-circle'>
                                                                <PiTrashSimple className='font-16' />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className='col-lg-5 d-flex justify-content-center'>
                                <div className='pushup-preview-box w-100 bg-white p-3 border-radius-16 d-flex align-items-center justify-content-center'>s
                                </div>
                            </div>

                        </div>
                    }

                </div>
            </div>
        </>
    );
};

export default PushupNotification;