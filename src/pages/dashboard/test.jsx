import React, { useRef, useState } from 'react'
import CampaignNavbar from '../../components/campaignNavbar';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { Dropdown, Nav } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { IoClose, IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoWhatsapp, IoLogoYoutube } from 'react-icons/io5';
import { postData } from "../../services/api";
import { toastError, toastSuccess } from "../../utils/toster";
import Button from '../../components/button';
import { RxCross1 } from 'react-icons/rx';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { GrAttachment } from 'react-icons/gr';
import { PiPencilSimple } from 'react-icons/pi';
import { FaFacebookSquare, FaTwitterSquare, FaYoutube } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';

const tabs = [
    { key: "tab1", label: "Info" },
    { key: "tab2", label: "Galaxy" },
    { key: "tab3", label: "Refer" },
    { key: "tab4", label: "Rewards" },
    // { key: "tab5", label: "Exclusive Offers" },
    // { key: "tab6", label: "Exciting Prizes" },
    // { key: "tab7", label: "Miscellaneous" },
];
// Add Icons
const platformIcons = {
    WhatsApp: <IoLogoWhatsapp size={25} />,
    Facebook: <IoLogoFacebook size={25} />,
    Instagram: <IoLogoInstagram size={25} />,
    YouTube: <IoLogoYoutube size={25} />,
    Twitter: <IoLogoTwitter size={25} />,
};

const Test = () => {
    // ===================
    // useForm
    // ===================
    const {
        register,
        handleSubmit,
        // setValue,
        formState: { errors, isSubmitting },
        // watch,
    } = useForm();
    const {
        register: registerAddGalaxy,
        handleSubmit: handleSubmitAddGalaxy,
        formState: { errors: errorsAddGalaxy, isSubmitting: isAddGalaxySubmitting },
        watch: watchAddGalaxy,
    } = useForm();
    const {
        register: registerReward,
        handleSubmit: handleSubmitReward,
        formState: { errors: errorsReward, isSubmitting: isRewardSubmitting },
        watch: watchReward,
    } = useForm();

    const GetAdminUid = sessionStorage.getItem("Auth");
    const NewMilestone = watchAddGalaxy("addnewmilestone");

    // ==============
    // useStates
    // =================
    const [Loading, setLoading] = useState(false);
    const [CampLogo, SetCampLogo] = useState();
    const [activeTab, setActiveTab] = useState(tabs[0].key);
    const [enabledTabs, setEnabledTabs] = useState([tabs[0].key]);
    const [primaryShare, setPrimaryShare] = useState("WhatsApp");
    const [primarySelected, setPrimarySelected] = useState("Choose one");
    // const [platforms, setPlatforms] = useState([
    //     "Facebook",
    //     "Instagram",
    //     "YouTube",
    //     "Twitter",
    //   ]);
    //=============
    // Function
    //=============

    // Active Tab Function
    const goToNextTab = () => {
        const currentIndex = tabs.findIndex((tab) => tab.key === activeTab);
        const nextTab = tabs[currentIndex + 1];
        if (nextTab) {
            setEnabledTabs((prev) =>
                prev.includes(nextTab.key) ? prev : [...prev, nextTab.key]
            );
            setActiveTab(nextTab.key);
        }
    };

    // Upload Logo function
    const handleCampLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check if file is an image
            if (file.type.startsWith("image/")) {
                // Create preview
                const reader = new FileReader();
                reader.onload = (e) => {
                    SetCampLogo(e.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                alert("Please select a valid image file (PNG, JPG, GIF, etc.)");
            }
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

    const HandleRewardForm = async (data) => {
        console.log("data: ", data);
        try {
            const getAuth = await postData("/admin/auths", {
                admin_uid: GetAdminUid,
            });
            const payload = {
                admin_uid: GetAdminUid,
                mode: getAuth?.access_token,
                log_alt: getAuth?.session_id,
                conversion_rates: {
                    meteors_to_stars: data?.meteor,
                    stars: data?.y_star,
                    stars_to_currency: data?.star,
                    currency: data?.point,
                },

                referrer_reward: data?.referrer,
                invitee_reward: data?.reward,
            };
            const response = await postData("/admin/set-referral-rewards", payload);

            if (response?.success) {
                toastSuccess(response?.message);
            }
            setLoading(false);
        } catch (error) {
            toastError(error?.error);
            setLoading(false);
        }
    };
    const handlePrimarySelect = (platform) => {
        setPrimarySelected(platform);
        setPrimaryShare(platform); // update primaryShare icon
    };

    const onAddGalaxySubmit = (data) => { };

    const onSubmit = async (data) => {
        try {
            const getAuth = await postData("/admin/auths", {
                admin_uid: GetAdminUid,
            });
            const payload = {
                admin_uid: GetAdminUid,
                mode: getAuth?.mode,
                log_alt: getAuth?.log_alt,
                campaign_name: data?.name,
                subtitle: data?.subtitle,
                image: CampLogo,
                url: data?.url,
                referrer_reward: 400,
                invitee_reward: 400,
                conversion_rates: {
                    meteors_to_stars: Number(data?.meteor),
                    stars: Number(data?.y_star),
                    stars_to_currency: Number(data?.star),
                    currency: Number(data?.point),
                },
                start_date: data?.start_date,
                end_date: data?.end_date,
                link: data?.invite_link,
                referrer_reward_type: data?.referrer_reward_type,
                referrer_reward_value: Number(data?.referrer_reward_value),
                referee_reward_type: data?.referee_reward_type,
                referee_reward_value: Number(data?.referee_reward_value),
                reward_condition: data?.reward_condition,
                // success_reward : data?.success_reward,
                platforms: [
                    {
                        platform: "linkedIn",
                        message: data?.fb,
                    },
                    {
                        platform: "twitter",
                        message: data?.fb,
                    },
                    {
                        platform: "whatsapp",
                        message: data?.fb,
                    },
                    {
                        platform: "telegram",
                        message: data?.fb,
                    },
                    {
                        platform: "facebook",
                        message: data?.fb,
                    },
                ],
                primary_platform: primaryShare,
                signup_reward: Number(data?.signup_reward_value),
                signup_reward_type: data?.signup_reward_type,
                login_reward: Number(data?.login_reward_value),
                login_reward_type: data?.login_reward_type,
                referer_reward: Number(data?.referer_reward),
                refer_reward_type: data?.refer_reward_type,
                invitee_reward: Number(data?.invitee_reward),
                invitee_reward_type: data?.invitee_reward_type,
            };
            const response = await postData("/admin/create-campaign", payload);
            // const Decrpt = await DecryptFunction(response?.data);
            toastSuccess(response?.message);
        } catch (error) {
            toastError(error?.message);
        }
    };

    return (
        <>
            <div className="min-vh-100 bg-light-white-3-color">
                {/* Header */}
                <CampaignNavbar />
                <div className="container pt-5">
                    <p className="text-blue-color font-24 montserrat-semibold mb-0">
                        Create Campaign
                    </p>
                    <p className="text-blue-color font-12 montserrat-medium">
                        Start a new campaign by filling out the details below.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="campaign-tab-bg d-flex justify-content-between align-items-center">
                        {/* <p className='mb-0 text-blue-color font-16'>Info</p> */}
                        <Nav
                            className="mt-2"
                            activeKey={activeTab}
                            onSelect={(selectedKey) => {
                                if (enabledTabs.includes(selectedKey)) {
                                    setActiveTab(selectedKey);
                                }
                            }}
                        >
                            {tabs.map((tab) => (
                                <Nav.Item key={tab.key}>
                                    <Nav.Link
                                        eventKey={tab.key}
                                        className={`font-16 montserrat-semibold text-border-gray-color ${!enabledTabs.includes(tab.key) ? "disabled-tab" : ""
                                            }`}
                                        disabled={!enabledTabs.includes(tab.key)}
                                    >
                                        {tab.label} <IoIosArrowForward className="mx-1 font-20" />
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                        <button
                            onClick={goToNextTab}
                            className="border-0 bg-blue-color text-white px-4 py-2"
                        >
                            Next <IoIosArrowForward className="ms-2" />
                        </button>
                    </div>

                    <div className="container py-3">
                        {/* Tab1 content Start here */}
                        {activeTab === "tab1" && (
                            <>
                                <div className="camp-form row border-radius-16 p-4">
                                    {/* <h2 className="text-center"> CAMPAIGN FORM</h2> */}
                                    <div className="col-lg-6 pt-3">
                                        {/* Campaign Name */}
                                        <div className="mb-3">
                                            <label
                                                htmlFor="campaignName"
                                                className="form-label font-14 text-gray-color montserrat-regular"
                                            >
                                                Campaign Name
                                            </label>
                                            <input
                                                id="campaignName"
                                                {...register("name", {
                                                    required: "Campaign name is required",
                                                })}
                                                className="form-control border-0 border-radiu-8 login-input text-blue-color montserrat-medium "
                                                placeholder="Enter campaign name"
                                            />
                                            {errors.name && (
                                                <p className="text-danger">{errors.name.message}</p>
                                            )}
                                        </div>

                                        {/* Subtitle */}
                                        <div className="mb-3">
                                            <label
                                                htmlFor="campaignSubtitle"
                                                className="form-label font-14 text-gray-color montserrat-regular"
                                            >
                                                Subtitle
                                            </label>
                                            <input
                                                id="campaignSubtitle"
                                                {...register("subtitle")}
                                                className="form-control border-0 border-radiu-8 login-input"
                                                placeholder="Enter campaign subtitle"
                                            />
                                        </div>

                                        {/* Campaign URL */}
                                        <div className="mb-3">
                                            <label
                                                htmlFor="campaignUrl"
                                                className="form-label font-14 text-gray-color montserrat-regular"
                                            >
                                                Campaign URL
                                            </label>
                                            <input
                                                id="campaignUrl"
                                                {...register("url", {
                                                    pattern: {
                                                        value: /^https?:\/\/.+$/,
                                                        message: "Enter a valid URL",
                                                    },
                                                })}
                                                className="form-control border-0 border-radiu-8 login-input"
                                                placeholder="https://pages.viral-loops.com/..."
                                            />
                                            {errors.url && (
                                                <p className="text-danger">{errors.url.message}</p>
                                            )}
                                        </div>

                                        {/* Company Logo */}
                                        <div className="mb-4">
                                            <label className="form-label font-14 text-gray-color montserrat-regular">
                                                Company Logo
                                            </label>
                                            <div className="d-flex align-items-center gap-3">
                                                {CampLogo ? (
                                                    <div className="position-relative">
                                                        <img
                                                            src={CampLogo}
                                                            alt="Logo preview"
                                                            className="rounded border"
                                                            style={{
                                                                width: "64px",
                                                                height: "64px",
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle p-1"
                                                            style={{
                                                                transform: "translate(50%, -50%)",
                                                                width: "24px",
                                                                height: "24px",
                                                            }}
                                                        //   onClick={handleRemoveLogo}
                                                        >
                                                            <IoClose size={14} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="border border-2 login-input border-dashed rounded d-flex align-items-center justify-content-center text-muted"
                                                        style={{
                                                            width: "64px",
                                                            height: "64px",
                                                        }}
                                                    >
                                                        <span>+</span>
                                                    </div>
                                                )}
                                                <div>
                                                    <label class="upload-box   d-flex text-center login-input bg-light-white-3-color p-2 rounded-3 text-blue-color font-12 montserrat-medium">
                                                        <div class="upload-icon"></div>
                                                        Upload Image
                                                        <input
                                                            type="file"
                                                            id="formFile"
                                                            {...register("logo")}
                                                            onChange={handleCampLogoUpload}
                                                        // onChange={(e) => HandleMailImg(e)}
                                                        />
                                                    </label>
                                                    <div className="form-text font-12 montserrat-medium text-gray-color">
                                                        Upload PNG, JPG, or GIF. Max size: 2MB
                                                    </div>
                                                </div>
                                                {/* <div className="flex-grow-1">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="form-control border-0 border-radiu-8 login-input"
                                                        {...register("logo")}
                                                        onChange={handleCampLogoUpload}
                                                    />
                                                    <div className="form-text font-12 montserrat-medium text-gray-color">
                                                        Upload PNG, JPG, or GIF. Max size: 2MB
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Tab2 content Start here */}
                        {activeTab === "tab2" && (
                            <>
                                <div className='row py-4'>
                                    <div className='col-lg-6'>
                                        <div className="bg-white border-radius-12 box-shadow p-4">
                                            {/* <div className="col-lg-12"> */}
                                            <form onSubmit={handleSubmitAddGalaxy(onAddGalaxySubmit)} className='row'>
                                                <h5 className=" font-18 montserrat-semibold text-gray-color mb-0">Create New Galaxy</h5>
                                                <p className='text-blue-color font-12 montserrat-medium'>This is the first level of the reward and referral program</p>
                                                {/* Galaxy Title */}
                                                <div className="col-lg-12 mb-3">
                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                                        Galaxy Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                                                        {...registerAddGalaxy("addgalaxy", {
                                                            required: "Galaxy Title is required",
                                                        })}
                                                    />
                                                    {errorsAddGalaxy.addgalaxy && (
                                                        <div className="text-danger">
                                                            {errorsAddGalaxy.addgalaxy.message}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Highest Galaxy Reward */}
                                                <div className="col-lg-6 mb-3">
                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                                        Highest Galaxy Reward
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="X Meteors"
                                                        className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                                                        {...registerAddGalaxy("addgalaxyReward")}
                                                    />
                                                    {errorsAddGalaxy.addgalaxyReward && (
                                                        <div className="text-danger">
                                                            {errorsAddGalaxy.addgalaxyReward.message}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Galaxy Stars */}
                                                <div className="col-lg-6 mb-3">
                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                                        Highest Galaxy Reward
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Y Stars"
                                                        className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                                                        {...registerAddGalaxy("addgalaxystar")}
                                                    />
                                                    {errorsAddGalaxy.addgalaxystar && (
                                                        <div className="text-danger">
                                                            {errorsAddGalaxy.addgalaxystar.message}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* No of Milestones */}
                                                <div className="col-lg-12">
                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                                        No of Milestones (levels inside)
                                                    </label>
                                                    <select
                                                        {...registerAddGalaxy("addnewmilestone")}
                                                        className="form-select login-input text-border-gray-color"
                                                        defaultValue=""
                                                    >
                                                        <option value="" disabled>
                                                            Choose the numbers
                                                        </option>
                                                        <option value="One">One</option>
                                                        <option value="Two">Two</option>
                                                        <option value="Three">Three</option>
                                                    </select>
                                                </div>
                                                {/* Submit Button */}
                                                <div className="col-lg-6 mt-4">
                                                    <Button
                                                        btn_class={
                                                            "border-purple bg-transparent px-4 w-100 text-purple-color"
                                                        }
                                                        btn_title={"Create New"}
                                                    />
                                                    {/* <button
                                                        type="submit"
                                                        className="border-0 rounded my-3 bg-primary py-2 px-3 font-14  montserrat-regular text-white"
                                                    >
                                                        Add Galaxy
                                                    </button> */}
                                                </div>
                                                <div className="col-lg-6 mt-4">
                                                    <Button
                                                        btn_class={
                                                            "border-purple bg-purple-color px-4 w-100 text-white"
                                                        }
                                                        btn_title={"Save Changes"}
                                                    />
                                                </div>
                                                {/* MileStone Form */}
                                                {Array.from({ length: Number(NewMilestone) })?.map(
                                                    (item, index) => (
                                                        <div className="milestone-form row">
                                                            <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                                                                Milestone {index + 1}
                                                            </p>
                                                            <p className="text-blue-color font-12 montserrat-medium">
                                                                This is the first milestone/ Level of the reward
                                                                and referral program
                                                            </p>

                                                            {/* Milestone Title */}
                                                            <div className="col-lg-12 mb-3">
                                                                <label
                                                                    htmlFor="milestoneTitle"
                                                                    className="form-label font-14 montserrat-regular text-border-gray-color"
                                                                >
                                                                    Milestone Title
                                                                </label>
                                                                <input
                                                                    id="milestoneTitle"
                                                                    {...register(`milestoneTitle${index + 1}`, {
                                                                        required: "Milestone Title is required",
                                                                    })}
                                                                    type="text"
                                                                    className="form-control login-input border-0"
                                                                />
                                                                {/* {errors.milestoneTitle && (
                                                                     <p className="text-danger">
                                                                         {errors.milestoneTitle.message}
                                                                     </p>
                                                                     )} */}
                                                            </div>

                                                            {/* Milestone Reward */}
                                                            <div className="col-lg-6 mb-3">
                                                                <label
                                                                    htmlFor="milestoneReward"
                                                                    className="form-label font-14 montserrat-regular text-border-gray-color"
                                                                >
                                                                    Milestone Reward
                                                                </label>
                                                                <input
                                                                    id="milestoneReward"
                                                                    {...register(`milestoneReward${index + 1}`, {
                                                                        required: "Milestone Reward is required",
                                                                    })}
                                                                    type="text"
                                                                    className="form-control login-input border-0"
                                                                />
                                                                {/* {errors.milestoneReward && (
                                                                    <p className="text-danger">
                                                                         {errors.milestoneReward.message}
                                                                     </p>
                                                              )} */}
                                                            </div>

                                                            {/* Meteors required to unlock */}
                                                            <div className="col-lg-6 mb-3">
                                                                <label
                                                                    htmlFor="meteorsRequired"
                                                                    className="form-label font-14 montserrat-regular text-border-gray-color"
                                                                >
                                                                    Meteors required to unlock
                                                                </label>
                                                                <input
                                                                    id="meteorsRequired"
                                                                    {...register(`meteorsRequired${index + 1}`, {
                                                                        required: "Meteors required is required",
                                                                        pattern: {
                                                                            value: /^[0-9]+$/,
                                                                            message: "Please enter a valid number",
                                                                        },
                                                                    })}
                                                                    type="text"
                                                                    className="form-control login-input border-0"
                                                                />
                                                                {/* {errors.meteorsRequired && (
                                                                              <p className="text-danger">
                                                                     {errors.meteorsRequired.message}
                                                                            </p>
                                                                     )} */}
                                                            </div>

                                                            {/* Milestone Description */}
                                                            <div className="col-lg-12 mb-3">
                                                                <label
                                                                    htmlFor="milestoneDescription"
                                                                    className="form-label font-14 montserrat-regular text-border-gray-color"
                                                                >
                                                                    Milestone Description
                                                                </label>
                                                                <textarea
                                                                    id="milestoneDescription"
                                                                    {...register(
                                                                        `milestoneDescription${index + 1}`
                                                                    )}
                                                                    className="form-control login-input border-0"
                                                                    rows={3}
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </form>
                                            {/* </div> */}
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="bg-white border-radius-12 border-light-gray p-4">
                                            <form className="row">
                                                <h5 className="font-18 montserrat-semibold text-gray-color mb-0">
                                                    Milestone 1
                                                </h5>
                                                <p className="text-blue-color font-12 montserrat-medium">
                                                    This is the first milestone/ Level of the reward and
                                                    referral program
                                                </p>

                                                <div className="col-lg-12 mb-3">
                                                    <label
                                                        htmlFor="milestoneTitle"
                                                        className="form-label font-14 montserrat-regular text-border-gray-color"
                                                    >
                                                        Milestone Title
                                                    </label>
                                                    <input
                                                        id="milestoneTitle"
                                                        {...register(`milestoneTitle`, {
                                                            required: "Milestone Title is required",
                                                        })}
                                                        type="text"
                                                        className="form-control login-input border-0"
                                                    />
                                                    {/* {errors.milestoneTitle && (
                                                                     <p className="text-danger">
                                                                         {errors.milestoneTitle.message}
                                                                     </p>
                                                                     )} */}
                                                </div>

                                                {/* Milestone Reward */}
                                                <div className="col-lg-6 mb-3">
                                                    <label
                                                        htmlFor="milestoneReward"
                                                        className="form-label font-14 montserrat-regular text-border-gray-color"
                                                    >
                                                        Milestone Reward
                                                    </label>
                                                    <input
                                                        id="milestoneReward"
                                                        {...register(`milestoneReward`, {
                                                            required: "Milestone Reward is required",
                                                        })}
                                                        type="text"
                                                        className="form-control login-input border-0"
                                                    />
                                                    {/* {errors.milestoneReward && (
                                                                    <p className="text-danger">
                                                                         {errors.milestoneReward.message}
                                                                     </p>
                                                              )} */}
                                                </div>

                                                {/* Meteors required to unlock */}
                                                <div className="col-lg-6 mb-3">
                                                    <label
                                                        htmlFor="meteorsRequired"
                                                        className="form-label font-14 montserrat-regular text-border-gray-color"
                                                    >
                                                        Meteors required to unlock
                                                    </label>
                                                    <input
                                                        id="meteorsRequired"
                                                        {...register(`meteorsRequired`, {
                                                            required: "Meteors required is required",
                                                            pattern: {
                                                                value: /^[0-9]+$/,
                                                                message: "Please enter a valid number",
                                                            },
                                                        })}
                                                        type="text"
                                                        className="form-control login-input border-0"
                                                    />
                                                    {/* {errors.meteorsRequired && (
                                                                              <p className="text-danger">
                                                                     {errors.meteorsRequired.message}
                                                                            </p>
                                                                     )} */}
                                                </div>

                                                {/* Milestone Description */}
                                                <div className="col-lg-12 mb-3">
                                                    <label
                                                        htmlFor="milestoneDescription"
                                                        className="form-label font-14 montserrat-regular text-border-gray-color"
                                                    >
                                                        Milestone Description
                                                    </label>
                                                    <textarea
                                                        id="milestoneDescription"
                                                        {...register(`milestoneDescription`)}
                                                        className="form-control login-input border-0"
                                                        rows={3}
                                                    ></textarea>
                                                </div>
                                                <hr />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Tab3 content Start here */}
                        {activeTab === "tab3" && (
                            <>
                                <div className='row py-4'>
                                    <div className='col-lg-6'>
                                        <div className='bg-white border-radius-12 box-shadow p-4'>
                                            <div class="accordion accordion-flush mb-2 border-0" id="accordionFlushExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="flush-headingOne">
                                                        <button className="accordion-button collapsed font-18 montserrat-semibold text-gray-color pb-0" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                            Share direct link via
                                                        </button>
                                                    </h2>
                                                    <div id="flush-collapseOne" className="accordion-collapse collapse text-blue-color" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                                        <div className="accordion-body text-blue-color">Choose a primary option to directly share the invite through social media</div>
                                                    </div>
                                                </div>


                                            </div>
                                            <label
                                                className="form-label font-14 montserrat-regular text-border-gray-color"
                                            >
                                                Galaxy Title
                                            </label>
                                            <div className="d-flex align-items-center gap-3 mb-3">
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
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => setPrimaryShare("")}
                                                    >
                                                        <RxCross1 className="font-10 text-blue-color" />
                                                    </span>
                                                    {platformIcons[primaryShare]}
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mb-3">
                                                <label
                                                    htmlFor="milestoneDescription"
                                                    className="form-label font-14 montserrat-regular text-border-gray-color"
                                                >
                                                    Message with invite
                                                </label>
                                                <textarea
                                                    id="milestoneDescription"
                                                    {...register(`messagewithinvite`)}
                                                    className="form-control login-input border-0"
                                                    rows={3}
                                                ></textarea>
                                            </div>
                                        </div>

                                        {/* Add Other Plateform and create Special Link */}
                                        <div className="accordion accordion-flush mt-3" id="accordionExample">
                                            <div className="accordion-item border-light-gray border-radius-12">
                                                <h2 className="accordion-header" id="flush-heading1">
                                                    <button className="accordion-button collapsed font-18 montserrat-semibold text-gray-color border-radius-12" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse1" aria-expanded="false" aria-controls="flush-collapse1">
                                                        Add other platforms
                                                    </button>
                                                </h2>
                                                <div id="flush-collapse1" className="accordion-collapse collapse text-blue-color" aria-labelledby="flush-heading1" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body text-blue-color">Choose a primary option to directly share the invite through social media</div>
                                                </div>
                                            </div>

                                            <div class="accordion-item mt-3 border-light-gray border-radius-12">
                                                <h2 class="accordion-header" id="flush-headingTwo">
                                                    <button className="accordion-button collapsed font-18 montserrat-semibold text-gray-color border-radius-12" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                                        Create special link
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseTwo" className="accordion-collapse collapse text-blue-color" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body text-blue-color">Choose a primary option to directly share the invite through social media</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-lg-6'>
                                        <div className='bg-white border-light-gray border-radius-12 p-4'>
                                            <div className='invite-card border-radius-8 text-center d-flex flex-column align-items-center justify-content-center'>
                                                <p className='text-white montserrat-semibold font-16'>Invite A Friend</p>
                                                <div className="copy-input-container position-relative">
                                                    <input
                                                        type="text"
                                                        className="copy-input input-invite-friend bg-white rounded-1 border-0"
                                                    />
                                                    <button className="invite-copy-butto text-white bg-blue-color font-12 rounded-1 me-1 px-2 position-absolute top-50 end-0 translate-middle-y border-0">
                                                        Copy
                                                    </button>
                                                </div>
                                                <div className="divider-with-text my-2">
                                                    <span className="divider-border mx-2 font-12">Or</span>
                                                </div>

                                                <button
                                                    className="btn-share-via-whatsapp border-0 bg-blue-color width-40 rounded-pill poppins-regular text-white bg-primary-color font-12 py-1 my-2"
                                                >
                                                    Share Via Whatsapp
                                                </button>

                                                <ul className="social-nav pl-0 d-flex justify-content-center">
                                                    <li
                                                        className="social-list cursor-pointer"
                                                    >
                                                        <FaFacebookSquare className='text-blue-color font-18' />
                                                    </li>
                                                    <li
                                                        className="social-list cursor-pointer"
                                                    >
                                                        <AiFillInstagram className='text-blue-color font-18' />
                                                    </li>
                                                    <li
                                                        className="social-list cursor-pointer"
                                                    >
                                                        <FaYoutube className='text-blue-color font-18' />
                                                    </li>
                                                    <li
                                                        className="social-list cursor-pointer"
                                                    >
                                                        <FaTwitterSquare className='text-blue-color font-18' />
                                                    </li>
                                                </ul>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "tab4" && (
                            <>
                                <div className='row py-4'>
                                    <div className='col-lg-6'>
                                        <div className='bg-white box-shadow border-radius-12 p-4'>
                                            <p className="font-18 montserrat-semibold text-gray-color mb-0">
                                                Referrer Rewards{" "}
                                            </p>
                                            <p className="text-blue-color font-12 montserrat-medium">
                                                What referrers get for successfully referring their friends{" "}
                                            </p>
                                            {/* Reward form Start Here */}
                                            <form onSubmit={handleSubmitReward(HandleRewardForm)}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <input
                                                        type="text"
                                                        className="form-control w-75 login-input border-radiu-8 font-14 py-2 border-0"
                                                        {...registerReward("referrer", {
                                                            required: "referrer is required",
                                                        })}
                                                    />

                                                    <span className="reward-icon rounded-circle reward-edit-icon d-flex justify-content-center align-items-center">
                                                        {" "}
                                                        <PiPencilSimple className="font-18" />
                                                    </span>
                                                    {/* Attach Icon & Hidden File Input */}
                                                    <span
                                                        className="reward-icon rounded-circle reward-attach-icon d-flex justify-content-center align-items-center"
                                                        onClick={() => referrerInputRef.current.click()}
                                                        style={{ cursor: "pointer" }}
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
                                                        style={{ display: "none" }}
                                                    />

                                                    <span className="reward-icon rounded-circle reward-delete-icon d-flex justify-content-center align-items-center">
                                                        <RiDeleteBin7Line className="font-18" />
                                                    </span>
                                                </div>
                                                {errorsReward.referrer && (
                                                    <p className="text-danger">
                                                        {errorsReward.referrer.message}
                                                    </p>
                                                )}
                                                {/* Referrer image preview */}
                                                {referrerImages.length > 0 && (
                                                    <div className="d-flex gap-3 flex-wrap mt-3">
                                                        {referrerImages.map((img) => (
                                                            <div key={img.id} className="position-relative">
                                                                <img
                                                                    src={img.url}
                                                                    alt="Uploaded"
                                                                    className="border-radius-12"
                                                                    style={{
                                                                        width: "100px",
                                                                        height: "100px",
                                                                        objectFit: "cover",
                                                                    }}
                                                                />
                                                                <span
                                                                    className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-white border text-danger"
                                                                    style={{ cursor: "pointer" }}
                                                                    onClick={() => removeReferrerImage(img.id)}
                                                                >
                                                                    &times;
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="mt-3">
                                                    <p className="font-18 montserrat-semibold text-gray-color mb-0">
                                                        Invitee Rewards
                                                    </p>
                                                    <p className="text-blue-color font-12 montserrat-medium">
                                                        What do their friends get after they successfully receive
                                                        their invite
                                                    </p>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <input
                                                            type="text"
                                                            className="form-control w-75 login-input border-radiu-8 font-14 py-2 border-0"
                                                            {...registerReward("reward", {
                                                                required: "reward is required",
                                                            })}
                                                        />

                                                        <span className="reward-icon rounded-circle reward-edit-icon d-flex justify-content-center align-items-center">
                                                            {" "}
                                                            <PiPencilSimple className="font-18" />
                                                        </span>
                                                        <span className="reward-icon rounded-circle reward-attach-icon d-flex justify-content-center align-items-center">
                                                            <GrAttachment className="font-18" />
                                                        </span>
                                                        <span className="reward-icon rounded-circle reward-delete-icon d-flex justify-content-center align-items-center">
                                                            <RiDeleteBin7Line className="font-18" />
                                                        </span>
                                                    </div>
                                                </div>
                                                {errorsReward.reward && (
                                                    <p className="text-danger">{errorsReward.reward.message}</p>
                                                )}

                                                {/* <button>Save Change</button> */}
                                                <Button btn_class={"border-0 mt-4 px-5 bg-purple-color text-white"} btn_title={"Save Change"} />
                                            </form>
                                        </div>
                                        {/* Set Conversion Rate */}
                                        <div className='bg-white box-shadow border-radius-12 p-4 mt-4'>
                                            <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                                                Set Conversion rates
                                            </p>
                                            <p className="text-blue-color font-12 montserrat-medium">
                                                Define how users can convert their meteors into stars and
                                                then into rewards
                                            </p>

                                            <div className="row">
                                                <div className="col-lg-12 d-flex align-items-center my-2">
                                                    <div className="">
                                                        <input
                                                            className="form-control login-input border-radiu-8 font-14 py-2 border-0"
                                                            placeholder="For every X Meteor"
                                                            type="number"
                                                            name=""
                                                            id=""
                                                            {...registerReward("meteor", {
                                                                required: "meteor is required",
                                                            })}
                                                        />
                                                        {errorsReward.meteor && (
                                                            <p className="text-danger">
                                                                {errorsReward.meteor.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <span className="mx-3">=</span>
                                                    <div>
                                                        <input
                                                            className="form-control login-input border-radiu-8 font-14 py-2 border-0"
                                                            placeholder="Y Star"
                                                            type="number"
                                                            name=""
                                                            id=""
                                                            {...registerReward("y_star", {
                                                                required: "y_star is required",
                                                            })}
                                                        />
                                                        {errorsReward.y_star && (
                                                            <p className="text-danger">
                                                                {errorsReward.y_star.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 d-flex align-items-center my-2">
                                                    <div>
                                                        <input
                                                            className="form-control login-input border-radiu-8 font-14 py-2 border-0"
                                                            placeholder="For every Y Star"
                                                            type="number"
                                                            name=""
                                                            id=""
                                                            {...registerReward("star", {
                                                                required: "star is required",
                                                            })}
                                                        />
                                                        {errorsReward.star && (
                                                            <p className="text-danger">
                                                                {errorsReward.star.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <span className="mx-3">=</span>
                                                    <div>
                                                        <input
                                                            className="form-control login-input border-radiu-8 font-14 py-2 border-0"
                                                            placeholder="ABC Points/Currency"
                                                            type="number"
                                                            name=""
                                                            id=""
                                                            {...registerReward("point", {
                                                                required: "point is required",
                                                            })}
                                                        />
                                                        {errorsReward.point && (
                                                            <p className="text-danger">
                                                                {errorsReward.point.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='bg-white border-light-gray border-radius-12 p-4'>
                                            <div className='invite-card border-radius-8 text-center d-flex flex-column align-items-center justify-content-center'>
                                                <p className='text-white montserrat-semibold font-16'>Invite A Friend</p>
                                                <div className="copy-input-container position-relative">
                                                    <input
                                                        type="text"
                                                        className="copy-input input-invite-friend bg-white rounded-1 border-0"
                                                    />
                                                    <button className="invite-copy-butto text-white bg-blue-color font-12 rounded-1 me-1 px-2 position-absolute top-50 end-0 translate-middle-y border-0">
                                                        Copy
                                                    </button>
                                                </div>
                                                <div className="divider-with-text my-2">
                                                    <span className="divider-border mx-2 font-12">Or</span>
                                                </div>

                                                <button
                                                    className="btn-share-via-whatsapp border-0 bg-blue-color width-40 rounded-pill poppins-regular text-white bg-primary-color font-12 py-1 my-2"
                                                >
                                                    Share Via Whatsapp
                                                </button>

                                                <ul className="social-nav pl-0 d-flex justify-content-center">
                                                    <li
                                                        className="social-list cursor-pointer"
                                                    >
                                                        <FaFacebookSquare className='text-blue-color font-18' />
                                                    </li>
                                                    <li
                                                        className="social-list cursor-pointer"
                                                    >
                                                        <AiFillInstagram className='text-blue-color font-18' />
                                                    </li>
                                                    <li
                                                        className="social-list cursor-pointer"
                                                    >
                                                        <FaYoutube className='text-blue-color font-18' />
                                                    </li>
                                                    <li
                                                        className="social-list cursor-pointer"
                                                    >
                                                        <FaTwitterSquare className='text-blue-color font-18' />
                                                    </li>
                                                </ul>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </>
                        )}
                    </div>
                </form >
            </div >
        </>
    );
};

export default Test;
