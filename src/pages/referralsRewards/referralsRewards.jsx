import React, { useRef, useState } from 'react'
import NavBar from '../../components/navbar';
import { Nav } from 'react-bootstrap';
import {
    IoIosArrowForward,
    IoLogoWhatsapp,
    IoLogoFacebook,
    IoLogoInstagram,
    IoLogoYoutube,
    IoLogoTwitter,
    IoIosArrowDown,
} from 'react-icons/io'
import { Dropdown } from 'react-bootstrap';
import { RxCross1 } from 'react-icons/rx';
import { PiExport, PiFadersHorizontal, PiPencilSimple, PiUploadSimpleBold } from 'react-icons/pi';
import { GrAttachment } from 'react-icons/gr';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { GoPlus } from 'react-icons/go';
import { useForm } from 'react-hook-form';
// import { BsArrowsAngleExpand } from 'react-icons/bs';
import { CgArrowsExpandRight } from 'react-icons/cg';
import EarningsTable from '../../components/earningsTable';
import Button from "../../components/button"

// Import Images
import User from "../../assets/images/ReferralRewards-img/User-reffer.svg";

// Import Json
const ReferralData = [
    { name: 'Areeba Mujeeb', referrals: 22 },
    { name: 'Areeba Mujeeb', referrals: 22 },
    { name: 'Areeba Mujeeb', referrals: 22 },
    { name: 'Areeba Mujeeb', referrals: 22 },
    { name: 'Areeba Mujeeb', referrals: 22 },
];

const EarnerData = [
    { name: 'Areeba Mujeeb', referrals: 5 },
    { name: 'Areeba Mujeeb', referrals: 5 },
    { name: 'Areeba Mujeeb', referrals: 5 },
    { name: 'Areeba Mujeeb', referrals: 5 },
    { name: 'Areeba Mujeeb', referrals: 5 },
];

const ReferralTableData = [
    {
        name: 'Areeba Mujeeb',
        email: 'areeba1234@gmail.com',
        referrals: 12,
        reward: '10000 Meteors',
    },
    {
        name: 'Areeba Mujeeb',
        email: 'areeba1234@gmail.com',
        referrals: 12,
        reward: '10000 Meteors',
    },
    {
        name: 'Areeba Mujeeb',
        email: 'areeba1234@gmail.com',
        referrals: 12,
        reward: '10000 Meteors',
    },
    {
        name: 'Areeba Mujeeb',
        email: 'areeba1234@gmail.com',
        referrals: 12,
        reward: '10000 Meteors',
    },
    {
        name: 'Areeba Mujeeb',
        email: 'areeba1234@gmail.com',
        referrals: 12,
        reward: '10000 Meteors',
    },
    {
        name: 'Areeba Mujeeb',
        email: 'areeba1234@gmail.com',
        referrals: 12,
        reward: '10000 Meteors',
    },
    {
        name: 'Areeba Mujeeb',
        email: 'areeba1234@gmail.com',
        referrals: 12,
        reward: '10000 Meteors',
    },
];

const InnerTableData = [
    {
        rewardType: 'Streak Store',
        date: '29 May, 2025',
        status: "Approved",
        eraning: '-540 Meteors',
        // meteors_color: "inner-table-meteors-orange",
    },
    {
        rewardType: 'Mystery Rewards',
        date: '22 May, 2025',
        status: "Approved",
        eraning: '+200 Meteors',
        // meteors_color: "inner-table-meteors-green",

    },
    {
        rewardType: 'Streak Store',
        date: '29 May, 2025',
        status: "Pending",
        eraning: '-540 Meteors',
        // meteors_color: "inner-table-meteors-orange",

    },
    {
        rewardType: 'Streak Store',
        date: '29 May, 2025',
        status: "Pending",
        eraning: '-540 Meteors',
        // meteors_color: "inner-table-meteors-orange",

    },
    {
        rewardType: 'Streak Store',
        date: '29 May, 2025',
        status: "Approved",
        eraning: '-540 Meteors',
        // meteors_color: "inner-table-meteors-green",

    },
    {
        rewardType: 'Streak Store',
        date: '29 May, 2025',
        status: "Pending",
        eraning: '-540 Meteors',
        // meteors_color: "inner-table-meteors-orange",

    },
    {
        rewardType: 'Streak Store',
        date: '29 May, 2025',
        status: "Approved",
        eraning: '-540 Meteors',
        // meteors_color: "inner-table-meteors-green",

    },
];
const ReferralsRewards = () => {
    const [activeTab, setActiveTab] = useState('tab1');
    const [primaryShare, setPrimaryShare] = useState('WhatsApp');
    const [platforms, setPlatforms] = useState(['Facebook', 'Instagram', 'YouTube', 'Twitter']);
    const [showInnerTable, setShowInnerTable] = useState(false);

    const {
        register,
        // handleSubmit,
        formState: { errors },
    } = useForm();


    // Add Icons
    const platformIcons = {
        WhatsApp: <IoLogoWhatsapp size={25} />,
        Facebook: <IoLogoFacebook size={25} />,
        Instagram: <IoLogoInstagram size={25} />,
        YouTube: <IoLogoYoutube size={25} />,
        Twitter: <IoLogoTwitter size={25} />,
    };


    //  Remove Social Icons function
    const removePlatform = (platform) => {
        setPlatforms(platforms.filter((p) => p !== platform));
    };
    const [primarySelected, setPrimarySelected] = useState('Choose one');
    const [otherSelected, setOtherSelected] = useState('Choose one');

    const handlePrimarySelect = (platform) => {
        setPrimarySelected(platform);
        setPrimaryShare(platform); // update primaryShare icon
    };

    const handleOtherSelect = (platform) => {
        setOtherSelected(platform);
        if (!platforms.includes(platform) && platforms.length < 4) {
            setPlatforms([...platforms, platform]);
        }
    };

    // image Upload function 
    const [referrerImages, setReferrerImages] = useState([]);
    const referrerInputRef = useRef(null);

    const handleReferrerFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            id: URL.createObjectURL(file), // unique id using blob URL
            url: URL.createObjectURL(file),
        }));
        setReferrerImages((prev) => [...prev, ...newImages]);
    };

    const removeReferrerImage = (id) => {
        setReferrerImages((prev) => prev.filter((img) => img.id !== id));
    };


    // Pagination table Function
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalPages = Math.ceil(ReferralTableData.length / rowsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1); // reset to first page
    };

    const paginatedData = ReferralTableData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <>
            <NavBar />
            <div className='bg-light-blue-color py-5 min-vh-100'>
                <div className='container'>
                    <div>
                        <p className='mb-0 text-blue-color montserrat-semibold font-24'>Referrals & Rewards</p>
                        <p className='mb-0 text-blue-color montserrat-medium font-12'>All rewards, exciting prizes and etc</p>
                    </div>
                </div>

                <div className='nav-tab-bg'>
                    <Nav className='mt-4 container' activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
                        <Nav.Item>
                            <Nav.Link eventKey="tab1" className='font-24 montserrat-semibold text-border-gray-color'>Refer <IoIosArrowForward className='mx-4' /></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="tab2" className='font-24 montserrat-semibold text-border-gray-color'>Rewards <IoIosArrowForward className='mx-4' /></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>

                <div className='container p-lg-4'>
                    {/* Tab Content */}
                    {/* tab 1 (Refer) Start Here */}
                    {activeTab === 'tab1' &&
                        <div className="row gy-3 mt-3">
                            <div className="col-lg-7">
                                <p className='font-18 montserrat-semibold text-border-gray-color mb-0'>Generate a special link</p>
                                <p className='text-blue-color font-12 montserrat-medium'>Select a start date and an end date to generate unique link for every user</p>
                                <form className='row'>
                                    <div className='col-lg-6 mb-3'>
                                        <input
                                            type="date"
                                            placeholder='Start Date'
                                            className="form-control text-blue-color rounded-3 border-0 py-2 "
                                            {...register('date')}
                                        />
                                    </div>
                                    <div className='col-lg-6 mb-3'>
                                        <input
                                            type="date"
                                            placeholder='Start Date'
                                            className="form-control text-blue-color rounded-3 border-0 py-2"
                                            {...register('date')}
                                        />
                                    </div>

                                    {/* Generate a Link */}
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control py-3 border-radiu-8 font-14 border-0" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                        <button class="rounded-end bg-blue-color py-2 px-3 font-12 border-blue montserrat-regular text-white" type="button" id="button-addon2">Auto Generate Link</button>
                                    </div>


                                    <p className='font-18 montserrat-semibold text-border-gray-color mb-0'>Referrer’s Reward</p>
                                    <div className='col-lg-6 mb-3'>
                                        <label className="form-label font-12 montserrat-medium text-blue-color">Reward Type</label>
                                        <select class="form-select text-blue-color rounded-3 border-0 py-2" aria-label="Default select example">
                                            <option selected>Select one</option>
                                            <option value="Meteor">Meteor</option>
                                            <option value="Star">Star</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Custom">Custom</option>
                                        </select>
                                    </div>
                                    <div className='col-lg-6 mb-3'>
                                        <label className="form-label font-12 montserrat-medium text-border-gray-color">Reward Value</label>
                                        <input
                                            type="text"
                                            placeholder='Select one'
                                            className="form-control text-blue-color rounded-3 border-0 py-2"
                                            {...register('rewardValue')}
                                        />
                                    </div>
                                    <p className='font-18 montserrat-semibold text-border-gray-color mb-0'>Referrer’s Reward</p>
                                    <div className='col-lg-6 mb-3'>
                                        <label className="form-label font-12 montserrat-medium text-blue-color">Reward Type</label>
                                        <select class="form-select text-blue-color rounded-3 border-0 py-2" aria-label="Default select example">
                                            <option selected>Select one</option>
                                            <option value="Meteor">Meteor</option>
                                            <option value="Star">Star</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Custom">Custom</option>
                                        </select>
                                    </div>
                                    <div className='col-lg-6 mb-3'>
                                        <label className="form-label font-12 montserrat-medium text-border-gray-color">Reward Value</label>
                                        <input
                                            type="text"
                                            placeholder='Select one'
                                            className="form-control text-blue-color rounded-3 border-0 py-2"
                                            {...register('rewardValue')}
                                        />
                                    </div>
                                    <p className='font-18 montserrat-semibold text-border-gray-color mb-0'>Reward Condition</p>
                                    <div className='col-lg-12 mb-3'>
                                        <label className="form-label font-12 montserrat-medium text-blue-color">Reward Condition</label>
                                        <select class="form-select text-blue-color rounded-3 border-0 py-2" aria-label="Default select example">
                                            <option selected>Select one</option>
                                            <option value="On Sign up">On Sign up</option>
                                            <option value="On 10 referrals">On 10 referrals</option>
                                            <option value="When all referred users spend ₹5000 total">When all referred users spend ₹5000 total</option>
                                            <option value="On Monthly Leaderboard Ranking">On Monthly Leaderboard Ranking</option>
                                            <option value="Custom">Custom</option>
                                        </select>
                                    </div>

                                    <div className='col-lg-12 mb-3'>
                                        <label className="form-label font-12 montserrat-medium text-blue-color">What Referrrer will get on successfully completing the condition</label>
                                        <select class="form-select text-blue-color rounded-3 border-0 py-2" aria-label="Default select example">
                                            <option selected>Select one</option>
                                            <option value="X % Discount on particular product">X % Discount on particular product</option>
                                            <option value="Early access to a sale or product drop">Early access to a sale or product drop</option>
                                            <option value="Double reward points">Double reward points</option>
                                            <option value="Free upgrade to a premium plan">Free upgrade to a premium plan</option>
                                            <option value="Custom">Custom</option>
                                        </select>
                                    </div>

                                    <div className='col-6'>
                                        {/* Save Button */}
                                        <Button
                                            btn_class={"text-white px-5 bg-blue-color border-0 mt-3"}
                                            btn_title={"Save Changes"}
                                        />
                                    </div>
                                </form>

                            </div>
                            <div className='col-lg-5'>
                                <div className='bg-white border-radius-16 p-4'>
                                    {/* Share directly via */}
                                    <div className="mb-3">
                                        <label className="font-18 montserrat-semibold text-border-gray-color mb-0">Share directly via</label>
                                        <p className="text-blue-color font-12 montserrat-medium">
                                            Choose a primary option to directly share the invite through social media
                                        </p>
                                        <div className="d-flex align-items-center gap-3">
                                            <Dropdown onSelect={handlePrimarySelect}>
                                                <Dropdown.Toggle
                                                    variant="light"
                                                    className="w-100 login-input text-start px-3 py-2 border-0 border-radius-8 d-flex justify-content-between align-items-center"
                                                >
                                                    <div className="d-flex align-items-center font-14 montserrat-medium text-blue-color gap-2 me-5">
                                                        <span>{primarySelected}</span>
                                                    </div>

                                                    {/* Custom Arrow */}
                                                    <IoIosArrowDown className="text-blue-color" />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className="w-100 shadow-sm rounded">
                                                    {Object.entries(platformIcons).map(([name, icon]) => (
                                                        <Dropdown.Item
                                                            key={name}
                                                            eventKey={name}
                                                            className="d-flex justify-content-between align-items-center border-bottom text-blue-color font-14 montserrat-medium px-3 py-2"
                                                        >
                                                            <span>{name}</span>
                                                            {icon}
                                                        </Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <div className="position-relative text-blue-color">
                                                <span
                                                    className="badge border-0 cross-icon rounded-circle position-absolute top-0 start-100 translate-middle"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => setPrimaryShare('')}
                                                >
                                                    <RxCross1 className='font-10 text-blue-color' />
                                                </span>
                                                {platformIcons[primaryShare]}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mb-3 border-bottom pb-3'>
                                        <label className="form-label font-12 montserrat-medium text-blue-color">Message with invite</label>
                                        <textarea class="form-control login-input rounded-3 border-0 py-2" rows="2"
                                            {...register('message')}
                                        ></textarea>
                                    </div>

                                    {/* Add other platforms */}
                                    <div className="mb-3">
                                        <label className="form-label font-18 montserrat-semibold text-border-gray-color">Add other platforms</label>
                                        <p className="text-blue-color font-12 montserrat-medium">
                                            Choose additional platforms you want to share the invite through social media
                                        </p>
                                        <div className="d-flex align-items-center gap-3 flex-wrap">
                                            <Dropdown onSelect={handleOtherSelect}>
                                                <Dropdown.Toggle
                                                    variant="light"
                                                    className="w-100 text-start login-input px-3 py-2 border-0 border-radius-8 d-flex justify-content-between align-items-center"
                                                >
                                                    <div className="d-flex font-14 montserrat-medium text-blue-color align-items-center gap-2 me-5">
                                                        {otherSelected}
                                                    </div>

                                                    {/* Custom Arrow */}
                                                    <IoIosArrowDown className="text-blue-color" />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className="w-100 shadow-sm rounded">
                                                    {Object.entries(platformIcons).map(([name, icon]) => (
                                                        <Dropdown.Item
                                                            key={name}
                                                            eventKey={name}
                                                            className="d-flex justify-content-between align-items-center border-bottom text-blue-color font-14 montserrat-medium px-3 py-2"
                                                        >
                                                            <span>{name}</span>
                                                            {icon}
                                                        </Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            {platforms.map((platform) => (
                                                <div className="position-relative mx-2 text-blue-color" key={platform}>
                                                    <span
                                                        className="badge text-center cross-icon border-0 rounded-circle position-absolute top-0 start-100 translate-middle"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => removePlatform(platform)}
                                                    >
                                                        <RxCross1 className='font-10 text-blue-color' />
                                                    </span>
                                                    {platformIcons[platform]}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='mb-3'>
                                        <label className="form-label font-12 montserrat-medium text-blue-color">Message with <span className='montserrat-semibold'>FACEBOOK</span> invite</label>
                                        <textarea class="form-control login-input rounded-3 border-0 py-2" rows="2"
                                            {...register('message')}
                                        ></textarea>
                                    </div>
                                    <div className='mb-3'>
                                        <label className="form-label font-12 montserrat-medium text-blue-color">Message with <span className='montserrat-semibold'>INSTAGRAM</span> invite</label>
                                        <textarea class="form-control login-input rounded-3 border-0 py-2" rows="2"
                                            {...register('message')}
                                        ></textarea>
                                    </div>
                                    <div className='mb-3'>
                                        <label className="form-label font-12 montserrat-medium text-blue-color">Message with <span className='montserrat-semibold'>YOUTUBE</span> invite</label>
                                        <textarea class="form-control login-input rounded-3 border-0 py-2" rows="2"
                                            {...register('message')}
                                        ></textarea>
                                    </div>
                                    <div className='mb-3'>
                                        <label className="form-label font-12 montserrat-medium text-blue-color">Message with <span className='montserrat-semibold'>TWITTER</span> invite</label>
                                        <textarea class="form-control login-input rounded-3 border-0 py-2" rows="2"
                                            {...register('message')}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <Button
                                            btn_class={"text-white px-5 bg-blue-color border-0 mt-3"}
                                            btn_title={"Save Changes"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>}

                    {/* Tab 2 (Rewards) Content Start Here */}
                    {activeTab === 'tab2' &&
                        <div className='row gy-3 mt-3'>
                            <div className='col-lg-7 scroll-section hide-scroll'>
                                <p className='font-18 montserrat-semibold text-border-gray-color mb-0'>Referrer Rewards </p>
                                <p className='text-blue-color font-12 montserrat-medium'>What referrers get for successfully referring their friends </p>
                                {/* Reward form Start Here */}
                                <form>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <input type="text" className="form-control w-75 border-radiu-8 font-14 py-2 border-0" />
                                        <span className='reward-icon rounded-circle reward-edit-icon d-flex justify-content-center align-items-center'> <PiPencilSimple className='font-18' /></span>
                                        {/* Attach Icon & Hidden File Input */}
                                        <span
                                            className="reward-icon rounded-circle reward-attach-icon d-flex justify-content-center align-items-center"
                                            onClick={() => referrerInputRef.current.click()}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <GrAttachment className="font-18" />
                                        </span>

                                        {/* Hidden file input */}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            ref={referrerInputRef}
                                            onChange={handleReferrerFileChange}
                                            style={{ display: 'none' }}
                                        />


                                        <span className='reward-icon rounded-circle reward-delete-icon d-flex justify-content-center align-items-center'><RiDeleteBin7Line className='font-18' /></span>
                                    </div>

                                    {/* Referrer image preview */}
                                    {referrerImages.length > 0 && (
                                        <div className="d-flex gap-3 flex-wrap mt-3">
                                            {referrerImages.map((img) => (
                                                <div key={img.id} className="position-relative">
                                                    <img
                                                        src={img.url}
                                                        alt="Uploaded"
                                                        className="border-radius-12"
                                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                    />
                                                    <span
                                                        className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-white border text-danger"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => removeReferrerImage(img.id)}
                                                    >
                                                        &times;
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className='mt-3'>
                                        <p className='font-18 montserrat-semibold text-border-gray-color mb-0'>Invitee Rewards</p>
                                        <p className='text-blue-color font-12 montserrat-medium'>What do their friends get after they successfully receive their invite</p>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <input type="text" className="form-control w-75 border-radiu-8 font-14 py-2 border-0" />
                                            <span className='reward-icon rounded-circle reward-edit-icon d-flex justify-content-center align-items-center'> <PiPencilSimple className='font-18' /></span>
                                            <span className='reward-icon rounded-circle reward-attach-icon d-flex justify-content-center align-items-center'><GrAttachment className='font-18' /></span>
                                            <span className='reward-icon rounded-circle reward-delete-icon d-flex justify-content-center align-items-center'><RiDeleteBin7Line className='font-18' /></span>
                                        </div>
                                    </div>
                                    <Button btn_class={"text-white px-5 bg-blue-color border-0 mt-5"}
                                        btn_title={"Save Changes"}
                                    />
                                </form>


                                {/* Top 5 Reffers and Earner Card Start Here */}
                                <div className='bg-light-white-color border-radius-12 mt-5 p-3'>
                                    <p className='font-18 montserrat-semibold text-border-gray-color'>Top 5 Referrers</p>
                                    <div className='row justify-content-start justify-content-lg-around g-1'>
                                        {ReferralData.map((item, index) => (
                                            <div key={index} className='col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3 d-flex align-items-center justify-content-center'>
                                                <div className='reffer-card border-radius-12 text-center px-2 d-flex flex-column align-items-center justify-content-center py-3 h-100'>
                                                    <img src={User} className='mb-3' alt="User" />
                                                    <p className='font-12 montserrat-semibold text-blue-color mb-0'>{item.name}</p>
                                                    <p className='font-14 montserrat-semibold text-blue-color mb-0'>{item.referrals} Referrals</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <p className='font-18 montserrat-semibold text-border-gray-color'>Top 5 Earners</p>
                                    <div className='row justify-content-start justify-content-lg-around g-1'>
                                        {EarnerData.map((item, index) => (
                                            <div key={index} className='col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3 d-flex align-items-center justify-content-center'>
                                                <div className='reffer-card border-radius-12 text-center d-flex px-2 flex-column align-items-center justify-content-center py-3 h-100'>
                                                    <img src={User} className='mb-3' alt="User" />
                                                    <p className='font-12 montserrat-semibold text-blue-color mb-0'>{item.name}</p>
                                                    <p className='font-14 montserrat-semibold text-blue-color mb-0'>{item.referrals} Stars</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className='d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 p-3'>
                                        {/* Title */}
                                        <p className='font-18 montserrat-semibold text-border-gray-color mb-0'>Reward History</p>

                                        {/* Right Controls */}
                                        <div className='d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3'>
                                            {/* Search Input */}
                                            <div>
                                                <input
                                                    className='form-control border-light-gray py-2 bg-light-white-1-color'
                                                    type='search'
                                                    placeholder='Search'
                                                    aria-label='Search'
                                                />
                                            </div>
                                            {/* Buttons */}
                                            <button className='text-blue-color border-light-gray border-radius-8 px-3 py-2 font-14 montserrat-medium bg-light-white-1-color'>
                                                Export <PiExport className='ms-2 font-24' />
                                            </button>

                                            <button className='text-blue-color border-light-gray border-radius-8 px-3 py-2 font-14 montserrat-medium bg-light-white-1-color'>
                                                Filter <PiFadersHorizontal className='ms-2 font-24' />
                                            </button>
                                        </div>
                                    </div>

                                    {!showInnerTable ? (
                                        /* Reward History Table */
                                        <div className='table-responsive border-radius-12'>
                                            <table class="table earning-table reward-history-table middle-align text-nowrap border-radius-12">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className='font-12 montserrat-medium text-blue-color py-3'>Name</th>
                                                        <th scope="col" className='font-12 montserrat-medium text-blue-color py-3'>E-mail</th>
                                                        <th scope="col" className='font-12 montserrat-medium text-blue-color py-3'>No of Rewards</th>
                                                        <th scope="col" className='font-12 montserrat-medium text-blue-color py-3'>Earnings</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {paginatedData.map((item, index) => (
                                                        <tr key={index}>
                                                            <td scope="row" className="font-12 montserrat-semibold text-blue-color py-3">
                                                                {item.name}
                                                            </td>
                                                            <td className="font-12 montserrat-semibold text-blue-color py-3">{item.email}</td>
                                                            <td className="font-12 montserrat-semibold text-blue-color py-3">{item.referrals}</td>
                                                            <td className="font-12 montserrat-semibold text-blue-color py-3"
                                                                onClick={() => setShowInnerTable(true)}
                                                            >{item.reward} <span className='text-blue-color rounded referral-table-arrow ms-3 p-1'><IoIosArrowForward className='font-14' /></span></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                    ) : (
                                        <div className='table-responsive border-radius-12'>
                                            <table class="table reward-inner-table earning-table reward-history-table middle-align text-nowrap border-radius-12">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className='font-12 montserrat-semibold text-blue-color py-3 ps-3'>Reward Type</th>
                                                        <th scope="col" className='font-12 montserrat-semibold text-blue-color py-3'>Date</th>
                                                        <th scope="col" className='font-12 montserrat-semibold text-blue-color py-3'>Status</th>
                                                        <th scope="col" className='font-12 montserrat-semibold text-blue-color py-3'>Earning/ Redemption</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {InnerTableData.map((item, index) => (
                                                        <tr key={index}>
                                                            <td scope="row" className="font-12 montserrat-semibold text-blue-color py-3 ps-3">
                                                                {item.rewardType}
                                                            </td>
                                                            <td className="font-12 montserrat-semibold text-blue-color py-3">{item.date}</td>
                                                            <td className={`font-12 montserrat-semibold py-3 ${item.status === "Approved" ? "text-live-green-color" : "pending-red-color"}`}>{item.status}</td>
                                                            <td className="font-12 montserrat-semibold text-blue-color py-3 d-flex align-items-center"><span className={`d-flex justify-content-center align-items-center ${item.status === "Approved" ? "inner-table-meteors-green" : "inner-table-meteors-orange"} rounded-2 px-3 py-2`}>
                                                                <span className={`rounded-circle meteors-dot me-2 ${item.status === "Approved" ? "bg-live-green-color" : "dot-orange"}`}>
                                                                </span> {item.eraning}</span></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                    {/* Pagination */}
                                    <div className='row gy-2 d-flex align-items-center mt-3'>
                                        <div className='col-lg-7 d-flex justify-content-end gap-4 '>
                                            <button className='text-gray-color border-gray border-radiu-8 px-3 py-2 bg-transparent font-14 poppins-medium'
                                                disabled={currentPage === 1}
                                                onClick={handlePrevious}>
                                                Previous</button>
                                            <button className='border-0 border-radiu-8 bg-blue-color text-white px-3 py-2 font-14 poppins-medium'
                                                disabled={currentPage === totalPages}
                                                onClick={handleNext}>
                                                Next</button>
                                        </div>
                                        <div className='col-lg-5 d-flex align-items-center justify-content-end gap-2'>
                                            <label className='font-14 poppins-medium'>Rows per page</label>
                                            <select
                                                className='form-select border-gray border-radiu-8 bg-transparent w-auto font-14 poppins-medium text-gray-color'
                                                value={rowsPerPage}
                                                onChange={handleRowsPerPageChange}
                                            >
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={15}>15</option>
                                                <option value={20}>20</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className='col-lg-5'>
                                <p className='font-18 montserrat-semibold text-border-gray-color mb-0'>Current Galaxy (Level)</p>
                                <p className='text-blue-color font-12 montserrat-medium'>You can add and edit Galaxies. The milestones below are part of this galaxy only</p>
                                <div className='bg-white d-flex justify-content-between border-radius-12'>
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic" variant='light' className='milky-dropdown border-0 px-5 py-3'>
                                            <span className='text-blue-color'>Milky Way Galaxy</span>
                                            <IoIosArrowDown className="text-blue-color ms-3 font-20" />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className='w-100'>
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <div className='d-flex justify-content-evenly gap-4 align-items-center me-4'>
                                        <span className='reward-icon rounded-circle reward-edit-icon d-flex justify-content-center align-items-center'
                                            data-bs-toggle="modal"
                                            data-bs-target="#emailUpdatesModal"
                                        > <PiPencilSimple className='font-18' /></span>
                                        <span className='reward-icon rounded-circle reward-plus-icon d-flex justify-content-center align-items-center'
                                            data-bs-toggle="modal"
                                            data-bs-target="#emailUpdatesModal"
                                        > <GoPlus className='font-18' /></span>
                                    </div>

                                    {/* Edit and Add Galaxy Modal */}
                                    <div
                                        className="modal fade"
                                        id="emailUpdatesModal"
                                        tabIndex="-1"
                                        aria-labelledby="emailUpdatesModalLabel"
                                        aria-hidden="true"
                                    >
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content border-radius-16 p-3">
                                                <div className="modal-header border-0 pb-0">
                                                    <h5 className="modal-title text-border-gray-color font-18 montserrat-semibold" id="emailUpdatesModalLabel">Create New Galaxy</h5>
                                                    <button type="button" className="btn-close text-blue-color rounded-circle push-edit-icon" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body pt-0">
                                                    <p className='font-12 montserrat-medium text-blue-color'>This is the first milestone/ Level of the reward <br /> and referral program</p>
                                                    <form className='row'>
                                                        <div className='col-lg-12 mb-3'>
                                                            <label className="form-label font-14 montserrat-regular text-border-gray-color">Galaxy Title</label>
                                                            <input
                                                                type="text"
                                                                className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                                                                {...register('galaxyTitle', {
                                                                    required: 'Galaxy Title is required',
                                                                })}
                                                            />
                                                            {errors.galaxyTitle && <div className="text-danger">{errors.galaxyTitle.message}</div>}
                                                        </div>

                                                        <label className="form-label font-14 montserrat-regular text-border-gray-color">Highest Galaxy Reward</label>
                                                        <div className='col-lg-6'>
                                                            <input
                                                                type="text"
                                                                placeholder='X Meteors'
                                                                className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                                                                {...register('galaxyReward')}
                                                            />
                                                            {errors.galaxyReward && <div className="text-danger">{errors.galaxyReward.message}</div>}
                                                        </div>
                                                        <div className='col-lg-6 mb-3'>
                                                            <input
                                                                type="text"
                                                                placeholder='Y Stars'
                                                                className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                                                                {...register('star')}
                                                            />
                                                            {errors.star && <div className="text-danger">{errors.star.message}</div>}
                                                        </div>
                                                        <div className='col-lg-12'>
                                                            <label className="form-label font-14 montserrat-regular text-border-gray-color">No of Milestones (levels inside)</label>
                                                            <select class="form-select login-input text-border-gray-color" aria-label="Default select example">
                                                                <option selected>Choose the numbers</option>
                                                                <option value="1">One</option>
                                                                <option value="2">Two</option>
                                                                <option value="3">Three</option>
                                                            </select>
                                                        </div>

                                                        <div className='d-flex justify-content-start align-items-center mt-4 gap-4'>
                                                            <Button
                                                                btn_class={"border-blue bg-transparent text-blue-color w-100"}
                                                                btn_title={"Create New"}
                                                            />
                                                            <Button
                                                                btn_class={"text-white bg-blue-color border-0 w-100"}
                                                                btn_title={"Save Changes"}
                                                            />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='bg-white border-radius-16 border-purple mt-4'>
                                    <ul className="nav nav-tabs" id="milestoneTab" role="tablist">
                                        <li className="nav-item border-0 w-50" role="presentation">
                                            <button
                                                className="nav-link border-0 py-3 tab-color milstone-tab1 font-16 montserrat-medium text-center active w-100"
                                                id="edit-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#EditTab"
                                                type="button"
                                                role="tab"
                                                aria-controls="EditTab"
                                                aria-selected="true"
                                            >
                                                <PiPencilSimple className='font-20 me-2' /> Edit Email
                                            </button>
                                        </li>
                                        <li className="nav-item w-50" role="presentation">
                                            <button
                                                className="nav-link border-0 py-3 tab-color milstone-tab2 font-16 montserrat-medium text-center w-100"
                                                id="add-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#AddTab"
                                                type="button"
                                                role="tab"
                                                aria-controls="AddTab"
                                                aria-selected="false"
                                            >
                                                <GoPlus className='font-20 me-2' /> Milestone
                                            </button>
                                        </li>
                                    </ul>

                                    <div className="tab-content p-3">
                                        <div
                                            className="tab-pane fade px-3 show active"
                                            id="EditTab"
                                            role="tabpanel"
                                            aria-labelledby="edit-tab"
                                        >
                                            <p className='font-18 montserrat-semibold text-border-gray-color mb-0'>Milestone Email</p>
                                            <p className='text-blue-color font-12 montserrat-medium'>Edit the email the participant will receive when they reach this milestone </p>
                                            <form className='row scroll-height '>
                                                <div className='col-lg-6 mb-3'>
                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">From Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control login-input rounded-3 border-0 py-2 "
                                                        {...register('name', {
                                                            required: 'name is required',
                                                        })}
                                                    />
                                                    {errors.name && <div className="text-danger">{errors.name.message}</div>}
                                                </div>
                                                <div className='col-lg-6 mb-3'>
                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">From E-mail</label>
                                                    <input
                                                        type="email"
                                                        className="form-control login-input rounded-3 border-0 py-2 "
                                                        {...register('email', {
                                                            required: 'Email is required',
                                                            pattern: {
                                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                message: 'Invalid email address',
                                                            },
                                                        })}
                                                    />
                                                    {errors.email && <div className="text-danger">{errors.email.message}</div>}
                                                </div>
                                                <div className='col-lg-6 mb-3'>
                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">Subject</label>
                                                    <input
                                                        type="text"
                                                        className="form-control login-input rounded-3 border-0 py-2 "
                                                        {...register('subject')}
                                                    />
                                                    {errors.subject && <div className="text-danger">{errors.subject.message}</div>}
                                                </div>
                                                <div className='col-lg-6 mb-3'>
                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">Reply to</label>
                                                    <input
                                                        type="text"
                                                        className="form-control login-input rounded-3 border-0 py-2 "
                                                        {...register('replyTo')}
                                                    />
                                                    {errors.replyTo && <div className="text-danger">{errors.replyTo.message}</div>}
                                                </div>
                                                <hr />
                                                <div className='col-lg-12 mb-3'>
                                                    <label for="exampleFormControlTextarea1" class="form-label font-14 montserrat-regular text-border-gray-color">Milestone Description</label>
                                                    <textarea class="form-control login-input border-0" id="exampleFormControlTextarea1" rows="3"></textarea>
                                                </div>
                                                <div className='col-lg-6 mb-3'>
                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">Button Text</label>
                                                    <input
                                                        type="text"
                                                        className="form-control login-input rounded-3 border-0 py-2 "
                                                        {...register('buttonText')}
                                                    />
                                                    {errors.buttonText && <div className="text-danger">{errors.buttonText.message}</div>}
                                                </div>
                                                <div className='col-lg-6 mb-3'>
                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">Button URL</label>
                                                    <input
                                                        type="text"
                                                        className="form-control login-input rounded-3 border-0 py-2 "
                                                        {...register('buttonUrl')}
                                                    />
                                                    {errors.buttonUrl && <div className="text-danger">{errors.buttonUrl.message}</div>}
                                                </div>
                                                <hr />
                                                <p className='font-14 montserrat-regular text-border-gray-color'>Upload a logo or header image related to your program. Higher resolution look nicer but it will be resized to maximum 600 px width</p>
                                                {/* Radio button */}
                                                <div className='d-flex mb-3'>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                                        <label class="form-check-label text-blue-color font-14 montserrat-medium" for="inlineRadio1">Header Image</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                        <label class="form-check-label text-blue-color font-14 montserrat-medium" for="inlineRadio2">Logo</label>
                                                    </div>
                                                </div>

                                                <div className='mb-3 col-lg-6'>
                                                    <label class="upload-box d-flex text-center login-input bg-light-white-3-color p-2 rounded-3 text-blue-color font-12 montserrat-medium">
                                                        <div class="upload-icon"><PiUploadSimpleBold className='font-16 me-3' /></div>
                                                        Upload
                                                        <input type="file" id="formFile" />
                                                    </label>
                                                </div>
                                                <div className='d-flex justify-content-start mt-4 gap-4'>
                                                    <Button
                                                        btn_class={"border-blue bg-transparent text-blue-color mt-3 w-100 px-0"}
                                                        btn_title={"Send a test mail"}
                                                    />
                                                    <Button
                                                        btn_class={"text-white bg-blue-color border-0 mt-3 w-100"}
                                                        btn_title={"Save & Send"}
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                        {/* Add tab Content */}
                                        <div
                                            className="tab-pane fade ps-3"
                                            id="AddTab"
                                            role="tabpanel"
                                            aria-labelledby="add-tab"
                                        >
                                            <form className='row scroll-height pe-5'>
                                                <p className='font-18 montserrat-semibold text-border-gray-color mb-0'>Milestone 1</p>
                                                <p className='text-blue-color font-12 montserrat-medium'>This is the first milestone/ Level of the reward and referral program</p>
                                                <div class="col-lg-12 mb-3">
                                                    <label for="exampleFormControlInput1" class="form-label font-14 montserrat-regular text-border-gray-color">Milestone Title</label>
                                                    <input type="text" class="form-control login-input border-0" id="exampleFormControlInput1" />
                                                </div>
                                                <div class="col-lg-6 mb-3">
                                                    <label for="exampleFormControlInput1" class="form-label font-14 montserrat-regular text-border-gray-color">Milestone Reward</label>
                                                    <input type="text" class="form-control login-input border-0" />
                                                </div>
                                                <div class="col-lg-6 mb-3">
                                                    <label for="exampleFormControlInput1" class="form-label font-14 montserrat-regular text-border-gray-color">Meteors required to unlock</label>
                                                    <input type="text" class="form-control login-input border-0" />
                                                </div>
                                                <div class="col-lg-12 mb-3">
                                                    <label for="exampleFormControlTextarea1" class="form-label font-14 montserrat-regular text-border-gray-color">Milestone Description</label>
                                                    <textarea class="form-control login-input border-0" id="exampleFormControlTextarea1" rows="3"></textarea>
                                                </div>
                                                <hr />

                                                <p className='font-18 montserrat-semibold text-border-gray-color mb-0'>Milestone 1</p>
                                                <p className='text-blue-color font-12 montserrat-medium'>This is the first milestone/ Level of the reward and referral program</p>
                                                <div class="col-lg-12 mb-3">
                                                    <label for="exampleFormControlInput1" class="form-label font-14 montserrat-regular text-border-gray-color">Milestone Title</label>
                                                    <input type="text" class="form-control login-input border-0" id="exampleFormControlInput1" />
                                                </div>
                                                <div class="col-lg-6 mb-3">
                                                    <label for="exampleFormControlInput1" class="form-label font-14 montserrat-regular text-border-gray-color">Milestone Reward</label>
                                                    <input type="text" class="form-control login-input border-0" />
                                                </div>
                                                <div class="col-lg-6 mb-3">
                                                    <label for="exampleFormControlInput1" class="form-label font-14 montserrat-regular text-border-gray-color">Meteors required to unlock</label>
                                                    <input type="text" class="form-control login-input border-0" />
                                                </div>
                                                <div class="col-lg-12 mb-3">
                                                    <label for="exampleFormControlTextarea1" class="form-label font-14 montserrat-regular text-border-gray-color">Milestone Description</label>
                                                    <textarea class="form-control login-input border-0" id="exampleFormControlTextarea1" rows="3"></textarea>
                                                </div>

                                                <div className='d-flex align-items-center justify-content-between mt-3 gap-3'>
                                                    <Button
                                                        btn_class={"border-blue bg-transparent text-blue-color w-100 px-0"}
                                                        btn_title={"Add New Milestone"}
                                                    />
                                                    <Button btn_class={"text-white bg-blue-color border-0 w-100"}
                                                        btn_title={"Save Changes"}
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    }
                </div>

            </div >
        </>
    );
};

export default ReferralsRewards;