import React, { useState } from 'react'
import CampaignNavbar from '../../components/campaignNavbar';
import { IoIosArrowForward } from 'react-icons/io';
import { Nav } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { postData } from "../../services/api";
import { toastError, toastSuccess } from "../../utils/toster";
import Button from '../../components/button';

const tabs = [
    { key: "tab1", label: "Info" },
    { key: "tab2", label: "Galaxy" },
    { key: "tab3", label: "Refer" },
    { key: "tab4", label: "Rewards" },
    { key: "tab5", label: "Exclusive Offers" },
    { key: "tab6", label: "Exciting Prizes" },
    { key: "tab7", label: "Miscellaneous" },

];

const Test = () => {
    // ===================
    // useForm
    // ===================
    const {
        register,
        handleSubmit,
        // setValue,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();
    const {
        register: registerAddGalaxy,
        handleSubmit: handleSubmitAddGalaxy,
        formState: { errors: errorsAddGalaxy, isSubmitting: isAddGalaxySubmitting },
        watch: watchAddGalaxy,
    } = useForm();

    const NewMilestone = watchAddGalaxy("addnewmilestone");

    // ==============
    // useStates
    // =================
    const [CampLogo, SetCampLogo] = useState();
    const [activeTab, setActiveTab] = useState(tabs[0].key);
    const [enabledTabs, setEnabledTabs] = useState([tabs[0].key]);


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
            <div className="min-vh-100 bg-light">
                {/* Header */}
                <CampaignNavbar />
                <div className='container pt-5'>
                    <p className="text-blue-color font-24 montserrat-semibold mb-0">Create Campaign</p>
                    <p className="text-blue-color font-12 montserrat-medium">Start a new campaign by filling out the details below.</p>
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
                        <button onClick={goToNextTab} className='border-0 bg-blue-color text-white px-4 py-2'>Next <IoIosArrowForward className="ms-2" /></button>
                    </div>

                    <div className='container py-3'>
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
                                            <label htmlFor="campaignUrl" className="form-label font-14 text-gray-color montserrat-regular">
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
                                            <label className="form-label font-14 text-gray-color montserrat-regular">Company Logo</label>
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
                                                <div className="flex-grow-1">
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Tab2 content Start here */}
                        {activeTab === "tab2" && (
                            <>
                                <div className='row py-3'>
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
                                                <div className='col-lg-6 mt-4'>
                                                    <Button btn_class={"border-purple bg-transparent px-4 w-100 text-purple-color"} btn_title={"Create New"} />
                                                    {/* <button
                                                        type="submit"
                                                        className="border-0 rounded my-3 bg-primary py-2 px-3 font-14  montserrat-regular text-white"
                                                    >
                                                        Add Galaxy
                                                    </button> */}
                                                </div>
                                                <div className='col-lg-6 mt-4'>
                                                    <Button btn_class={"border-purple bg-purple-color px-4 w-100 text-white"} btn_title={"Save Changes"} />
                                                </div>
                                                {/* MileStone Form */}
                                                {Array.from({ length: Number(NewMilestone) })?.map(
                                                    (item, index) => (
                                                        <div className="milestone-form row">
                                                            <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                                                                Milestone {index + 1}
                                                            </p>
                                                            <p className="text-blue-color font-12 montserrat-medium">
                                                                This is the first milestone/ Level of the reward and
                                                                referral program
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
                                                                    {...register(`milestoneDescription${index + 1}`)}
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

                                    <div className='col-lg-6'>
                                        <div className="bg-white border-radius-12 border-light-gray p-4">
                                            <form className='row'>
                                                <h5 className="font-18 montserrat-semibold text-gray-color mb-0">Milestone 1</h5>
                                                <p className='text-blue-color font-12 montserrat-medium'>This is the first milestone/ Level of the reward and referral program</p>

                                                <div className='col-lg-12 mb-3'>
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
                                asdfghgfd
                            </>
                        )}
                    </div>
                </form >
            </div >
        </>
    );
};

export default Test;