import React, { useContext, useEffect, useRef, useState } from "react";
import CampaignNavbar from "../../components/campaignNavbar";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { Dropdown, Nav } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  IoClose,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoWhatsapp,
  IoLogoYoutube,
} from "react-icons/io5";
import { postData } from "../../services/api";
import { toastError, toastSuccess } from "../../utils/toster";
import Button from "../../components/button";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin7Line } from "react-icons/ri";
import { GrAttachment } from "react-icons/gr";
import { PiPencilSimple } from "react-icons/pi";
import { FaFacebookSquare, FaLinkedin, FaTelegram, FaTwitterSquare, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { UserContext } from "../../utils/UseContext/useContext";

const tabs = [
  { key: "tab1", label: "Basic Info" },
  { key: "tab2", label: "Create Galaxy" },
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
  LinkedIn: <FaLinkedin size={25} />,
  Telegram: <FaTelegram size={25} />,
  Twitter: <IoLogoTwitter size={25} />,
};

const CampaignForm = () => {
  // ===================
  // useForm
  // ===================
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const { ContextToEditForm } = useContext(UserContext);
  console.log("ContextToEditForm: ", ContextToEditForm);

  const GetAdminUid = sessionStorage.getItem("Auth");
  const NewMilestone = watch("addnewmilestone");

  // ==============
  // useStates
  // =================
  const [Loading, setLoading] = useState(false);
  const [CampLogo, SetCampLogo] = useState();
  const [NoGalaxy, SetNoGalaxy] = useState(1);
  const [InviteLink, SetInviteLink] = useState();
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [enabledTabs, setEnabledTabs] = useState([tabs[0].key]);
  const [primaryShare, setPrimaryShare] = useState("WhatsApp");
  const [otherSelected, setOtherSelected] = useState("Choose one");
  const [primarySelected, setPrimarySelected] = useState("Choose one");
  const [platforms, setPlatforms] = useState([
    "Facebook",
    "LinkedIn",
    "Telegram",
    "Twitter",
  ]);
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

  const StartDate = watch("start_date");
  const EndDate = watch("end_date");

  const HandleGentLink = async () => {
    setLoading(true);
    try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });
      const payload = {
        admin_uid: GetAdminUid,
        mode: getAuth?.mode,
        log_alt: getAuth?.log_alt,
        start_date: new Date(StartDate)?.toLocaleDateString("en-GB"),
        expiry_date: new Date(EndDate)?.toLocaleDateString("en-GB"),
      };
      const response = await postData("/generate-link", payload);
      if (response?.success) {
        toastSuccess(response?.message);
        setValue("invite_link", response?.link);
        setValue("active", response?.active);
        SetInviteLink(response?.link);
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
  const handleOtherSelect = (platform) => {
    setOtherSelected(platform);
    if (!platforms.includes(platform) && platforms.length < 4) {
      setPlatforms([...platforms, platform]);
    }
  };
  const onAddGalaxySubmit = (data) => { };

  const onSubmit = async (data) => {
    console.log("data: ", data);
    // try {
    //   const getAuth = await postData("/admin/auths", {
    //     admin_uid: GetAdminUid,
    //   });
    const payload = {
      // admin_uid: GetAdminUid,
      // mode: getAuth?.mode,
      // log_alt: getAuth?.log_alt,
      campaign_name: data?.name,
      subtitle: data?.subtitle,
      image: CampLogo,
      url: data?.url,
      // referrer_reward: 400,
      // invitee_reward: 400,
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
      success_reward: data?.success_reward,
      platforms: [
        {
          platform: "linkedIn",
          message: data?.fb,
        },
        {
          platform: "twitter",
          message: data?.tw,
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
    console.log("payload: ", payload);
    //   const response = await postData("/admin/create-campaign", payload);
    //   // const Decrpt = await DecryptFunction(response?.data);
    //   toastSuccess(response?.message);
    // } catch (error) {
    //   toastError(error?.message);
    // }
  };

  // dummy data json
  let dumy = {
    name: "camp",
    subtitle: "sub",
    url: "https://www.rumeno.in/home",
    logo: {},
    // "galaxies": [
    //     {
    //         "title": "title",
    //         "reward": "me1",
    //         "stars": "st1",
    //         "milestoneCount": "2",
    //         "milestones": [
    //             {
    //                 "title": "mt 1",
    //                 "reward": "mr1",
    //                 "meteors": "mu 1",
    //                 "description": "md 1"
    //             },
    //             {
    //                 "title": "mt2",
    //                 "reward": "mr2",
    //                 "meteors": "mu2",
    //                 "description": "md2"
    //             }
    //         ]
    //     },
    //     {
    //         "title": "gt2",
    //         "reward": "m2",
    //         "stars": "s2",
    //         "milestoneCount": "1",
    //         "milestones": [
    //             {
    //                 "title": "mt3",
    //                 "reward": "mr3",
    //                 "meteors": "mu3",
    //                 "description": "md3"
    //             }
    //         ]
    //     }
    // ],
    // "messagewithinvite": "main link",
    // "fb": "fb",
    // "insta": "inst",
    // "yt": "you",
    // "tw": "tw",
    // "start_date": "2025-07-24",
    // "end_date": "2025-08-02",
    // "invite_link": "link",
    // "referrer_reward_type": "Meteor",
    // "referrer_reward_value": "77",
    // "referee_reward_type": "Star",
    // "referee_reward_value": "88",
    // "reward_condition": "On 10 referrals",
    // "success_reward": "Early access to a sale or product drop",
    // "referrer": "reffer",
    // "reward": "invite",
    // "meteor": "22",
    // "y_star": "22",
    // "star": "111",
    // "point": "111"
  };
  useEffect(() => {
    if (ContextToEditForm) {
      setValue("name", dumy?.name);
      setValue("url", dumy?.url);
    }
  }, []);

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
            <div className="container">
              {!ContextToEditForm ? (
                <Nav
                  // className="mt-2"
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
                        {tab.label}{" "}
                        <IoIosArrowForward className="mx-1 font-20" />
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              ) : (
                <Nav
                  // className="mt-2"
                  activeKey={activeTab}
                  onSelect={(selectedKey) => {
                    // if (enabledTabs.includes(selectedKey)) {
                    setActiveTab(selectedKey);
                    // }
                  }}
                >
                  {tabs.map((tab) => (
                    <Nav.Item key={tab.key}>
                      <Nav.Link
                        eventKey={tab.key}
                        className={`font-16 montserrat-semibold text-blue-color ${enabledTabs.includes(tab.key) ? "disabled-tab" : ""
                          }`}
                      // disabled={!enabledTabs.includes(tab.key)}
                      >
                        {tab.label}{" "}
                        <IoIosArrowForward className="mx-1 font-20" />
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              )}
            </div>
            {activeTab === "tab4" ? (
              <button
                // onClick={goToNextTab}
                type="submit"
                className="border-0 bg-blue-color text-white px-4 py-2"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={goToNextTab}
                className="border-0 bg-blue-color text-white px-4 py-2"
              >
                Next <IoIosArrowForward className="ms-2" />
              </button>
            )}
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
                              onChange={(e) => handleCampLogoUpload(e)}
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
                <div className="">
                  <Button
                    onClick={() => SetNoGalaxy((prev) => prev + 1)}
                    btn_class="border-purple bg-transparent px-4 w-25 text-purple-color"
                    btn_title="Create New"
                  />
                </div>
                {Array.from({ length: Number(NoGalaxy) || 1 })?.map(
                  (_, galaxyIndex) => (
                    <div className="row py-4">
                      <div className="col-lg-6">
                        <div className="bg-white border-radius-12 box-shadow p-4">
                          {/* <div className="col-lg-12"> */}
                          <div
                            // onSubmit={handleSubmitAddGalaxy(onAddGalaxySubmit)}
                            className="row"
                          >
                            <h5 className=" font-18 montserrat-semibold text-gray-color mb-0">
                              Create New Galaxy {galaxyIndex + 1}
                            </h5>
                            <p className="text-blue-color font-12 montserrat-medium">
                              This is the first level of the reward and referral
                              program
                            </p>
                            {/* Galaxy Title */}
                            <div className="col-lg-12 mb-3">
                              <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                Galaxy Title
                              </label>
                              <input
                                type="text"
                                className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                                {...register(`galaxies.${galaxyIndex}.title`, {
                                  required: "Galaxy Title is required",
                                })}
                              />
                              {/* {errors?.galaxies?.[galaxyIndex]?.title && (
                                                                  <div className="text-danger">
                                                                  {errors.galaxies[galaxyIndex].title.message}
                                                                   </div>
                                                                     )} */}
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
                                {...register(`galaxies.${galaxyIndex}.reward`)}
                              />
                              {/* {errors?.galaxies.$[galaxyIndex].reward && (
                                                                        <div className="text-danger">
                                                                          {errors?.galaxies.$[galaxyIndex].reward.message}
                                                                             </div>
                                                                      )} */}
                            </div>

                            {/* Galaxy Stars */}
                            <div className="col-lg-6 mb-3">
                              <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                Star
                              </label>
                              <input
                                type="text"
                                placeholder="Y Stars"
                                className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                                {...register(`galaxies.${galaxyIndex}.stars`)}
                              />
                              {/* {errors.galaxies.$[galaxyIndex].stars && (
                                                                       <div className="text-danger">
                                                                          {errors.galaxies.$[galaxyIndex].stars.message}
                                                                       </div>
                                                                    )} */}
                            </div>

                            {/* No of Milestones */}
                            <div className="col-lg-12">
                              <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                No of Milestones (levels inside)
                              </label>
                              <select
                                {...register(
                                  `galaxies.${galaxyIndex}.milestoneCount`
                                )}
                                className="form-select login-input text-border-gray-color"
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Choose the numbers
                                </option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </div>
                            {/* Submit Button */}
                            <div className="col-lg-6 mt-4">
                              {/* <Button
                                                                onClick={()=>SetNoGalaxy(NoGalaxy +1)}
                                                            btn_class={
                                                             "border-purple bg-transparent px-4 w-100 text-purple-color"
                                                                    }
                                                                   btn_title={"Create New"}
                                                                      /> */}
                              {/* <button
                                                          type="submit"
                                                          className="border-0 rounded my-3 bg-primary py-2 px-3 font-14  montserrat-regular text-white"
                                                      >
                                                          Add Galaxy
                                                      </button> */}
                            </div>
                            {/* <div className="col-lg-6 mt-4">
                                                               <Button
                                                                   btn_class={
                                                                        "border-purple bg-purple-color px-4 w-100 text-white"
                                                                             }
                                                                       btn_title={"Save Changes"}
                                                                       />
                                                                </div> */}
                          </div>
                          {/* </div> */}
                        </div>
                      </div>

                      <div className="col-lg-6 new-milestone-form">
                        <div className="bg-white border-radius-12 border-light-gray p-4 milestone-form-sect">
                          {/* MileStone Form */}
                          {Array.from({
                            length: Number(
                              watch(`galaxies.${galaxyIndex}.milestoneCount`) ||
                              1
                            ),
                          }).map((_, milestoneIndex) => (
                            <div
                              key={milestoneIndex}
                              className="milestone-form row"
                            >
                              <hr
                                className={`${milestoneIndex == 0 ? "d-none" : ""
                                  }`}
                              />
                              <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                                Milestone {milestoneIndex + 1}
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
                                  {...register(
                                    `galaxies.${galaxyIndex}.milestones.${milestoneIndex}.title`,
                                    {
                                      required: "Milestone Title is required",
                                    }
                                  )}
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
                                  {...register(
                                    `galaxies.${galaxyIndex}.milestones.${milestoneIndex}.reward`,
                                    {
                                      required: "Milestone Reward is required",
                                    }
                                  )}
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
                                  {...register(
                                    `galaxies.${galaxyIndex}.milestones.${milestoneIndex}.meteors`,
                                    {
                                      required: "Meteors required is required",
                                      pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Please enter a valid number",
                                      },
                                    }
                                  )}
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
                                    `galaxies.${galaxyIndex}.milestones.${milestoneIndex}.description`
                                  )}
                                  className="form-control login-input border-0"
                                  rows={3}
                                ></textarea>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </>
            )}

            {/* Tab3 content Start here */}
            {activeTab === "tab3" && (
              <>
                <div className="row py-4">
                  <div className="col-lg-6">
                    <div
                      class="accordion accordion-flush mb-2 border-0"
                      id="accordionFlushExample"
                    >
                      <div className="accordion-item bg-white box-shadow border-light-gray border-radius-12 mb-3">
                        <h2 className="accordion-header" id="flush-headingOne">
                          <button
                            className="accordion-button collapsed font-18 montserrat-semibold text-gray-color border-radius-12 pb-1"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="true"
                            aria-controls="flush-collapseOne"
                          >
                            Share direct link via
                          </button>
                          <p className="ps-3 font-12 montserrat-medium text-blue-color">
                            {" "}
                            Choose a primary option to directly share the invite
                            through social media
                          </p>
                        </h2>
                        <div
                          id="flush-collapseOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="flush-headingOne"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body text-blue-color">
                            <label className="form-label font-14 montserrat-regular text-border-gray-color">
                              Primary
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
                                  {Object.entries(platformIcons).map(
                                    ([name, icon]) => (
                                      <Dropdown.Item
                                        key={name}
                                        eventKey={name}
                                        className="d-flex justify-content-between align-items-center border-bottom text-blue-color font-14 montserrat-medium px-3 py-2"
                                      >
                                        <span>{name}</span>
                                        {icon}
                                      </Dropdown.Item>
                                    )
                                  )}
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
                        </div>
                      </div>

                      {/* Add Other PlateForms */}
                      <div className="accordion-item bg-white box-shadow border-light-gray border-radius-12 mb-3">
                        <h2 className="accordion-header" id="flush-headingTwo">
                          <button
                            className="accordion-button collapsed font-18 montserrat-semibold text-gray-color border-radius-12 pb-1"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseTwo"
                            aria-expanded="false"
                            aria-controls="flush-collapseTwo"
                          >
                            Add other platforms
                          </button>
                          <p className="ps-3 font-12 montserrat-medium text-blue-color">
                            Choose a primary option to directly share the invite
                            through social media
                          </p>
                        </h2>
                        <div
                          id="flush-collapseTwo"
                          className="accordion-collapse collapse text-blue-color"
                          aria-labelledby="flush-headingTwo"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body text-blue-color">
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
                                  {Object.entries(platformIcons).map(
                                    ([name, icon]) => (
                                      <Dropdown.Item
                                        key={name}
                                        eventKey={name}
                                        className="d-flex justify-content-between align-items-center border-bottom text-blue-color font-14 montserrat-medium px-3 py-2"
                                      >
                                        <span>{name}</span>
                                        {icon}
                                      </Dropdown.Item>
                                    )
                                  )}
                                </Dropdown.Menu>
                              </Dropdown>
                              {platforms.map((platform) => (
                                <div
                                  className="position-relative mx-2 text-blue-color"
                                  key={platform}
                                >
                                  <span
                                    className="badge text-center cross-icon border-0 rounded-circle position-absolute top-0 start-100 translate-middle"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => removePlatform(platform)}
                                  >
                                    <RxCross1 className="font-10 text-blue-color" />
                                  </span>
                                  {platformIcons[platform]}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mb-3 px-3">
                            <label className="form-label font-12 montserrat-medium text-blue-color">
                              Message with{" "}
                              <span className="montserrat-semibold text-uppercase">
                                FACEBOOK
                              </span>{" "}
                              invite
                            </label>
                            <textarea
                              class="form-control login-input rounded-3 border-0 py-2"
                              rows="2"
                              {...register("fb")}
                            ></textarea>
                          </div>
                          <div className="mb-3 px-3">
                            <label className="form-label font-12 montserrat-medium text-blue-color">
                              Message with{" "}
                              <span className="montserrat-semibold text-uppercase">
                              Telegram
                              </span>{" "}
                              invite
                            </label>
                            <textarea
                              class="form-control login-input rounded-3 border-0 py-2"
                              rows="2"
                              {...register("tl")}
                            ></textarea>
                          </div>
                          <div className="mb-3 px-3">
                            <label className="form-label font-12 montserrat-medium text-blue-color">
                              Message with{" "}
                              <span className="montserrat-semibold text-uppercase">
                                LinkedIn
                              </span>{" "}
                              invite
                            </label>
                            <textarea
                              class="form-control login-input rounded-3 border-0 py-2"
                              rows="2"
                              {...register("Ln")}
                            ></textarea>
                          </div>
                          <div className="mb-3 px-3">
                            <label className="form-label font-12 montserrat-medium text-blue-color">
                              Message with{" "}
                              <span className="montserrat-semibold text-uppercase">
                                TWITTER
                              </span>{" "}
                              invite
                            </label>
                            <textarea
                              class="form-control login-input rounded-3 border-0 py-2"
                              rows="2"
                              {...register("tw")}
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      {/* Create Special Link */}
                      <div class="accordion-item bg-white box-shadow border-light-gray border-radius-12">
                        <h2 class="accordion-header" id="flush-headingThree">
                          <button
                            className="accordion-button collapsed font-18 montserrat-semibold text-gray-color border-radius-12 pb-1"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseThree"
                            aria-expanded="false"
                            aria-controls="flush-collapseThree"
                          >
                            Create special link
                          </button>
                          <p className="ps-3 font-12 montserrat-medium text-blue-color">
                            Choose a primary option to directly share the invite
                            through social media
                          </p>
                        </h2>
                        <div
                          id="flush-collapseThree"
                          className="accordion-collapse collapse text-blue-color"
                          aria-labelledby="flush-headingThree"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body text-blue-color">
                            <div className="row">
                              {/* Start Date */}
                              <div className="col-lg-6 mb-3">
                                <input
                                  type="date"
                                  placeholder="Start Date"
                                  className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                                  {...register("start_date", {
                                    required: "Start Date is required",
                                  })}
                                  defaultValue={
                                    new Date().toISOString().split("T")[0]
                                  }
                                  min={new Date().toISOString().split("T")[0]}
                                />
                                {errors.start_date && (
                                  <p className="text-danger">
                                    {errors.start_date.message}
                                  </p>
                                )}
                              </div>

                              {/* End Date */}
                              <div className="col-lg-6 mb-3">
                                <input
                                  type="date"
                                  placeholder="End Date"
                                  className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                                  {...register("end_date", {
                                    required: "End Date is required",
                                  })}
                                  min={
                                    new Date(Date.now() + 86400000)
                                      .toISOString()
                                      .split("T")[0]
                                  }
                                />
                                {errors.end_date && (
                                  <p className="text-danger">
                                    {errors.end_date.message}
                                  </p>
                                )}
                              </div>

                              {/* Generate a Link */}
                              <div className="input-group mb-3">
                                <input
                                  type="text"
                                  className="form-control login-input py-2 border-radiu-8 font-14 border-0"
                                  aria-label="Recipient's username"
                                  aria-describedby="button-addon2"
                                  value={InviteLink}
                                  {...register("invite_link", {
                                    required: "Invite link is required",
                                  })}
                                />
                                <button
                                  className="rounded-end bg-purple-color py-2 px-3 font-12 border-0 montserrat-regular text-white"
                                  type="button"
                                  id="button-addon2"
                                  disabled={Loading}
                                  onClick={() => HandleGentLink()}
                                >
                                  {Loading
                                    ? "Link Genrating..."
                                    : "Auto Generate Link"}
                                </button>
                              </div>
                              {errors.invite_link && (
                                <p className="text-danger">
                                  {errors.invite_link.message}
                                </p>
                              )}

                              {/* Referrer’s Reward Section */}
                              <p className="font-18 montserrat-semibold text-gray-color mb-0">
                                Referrer’s Reward
                              </p>

                              {/* Reward Type */}
                              <div className="col-lg-6 mb-3">
                                <label className="form-label font-12 montserrat-medium text-gray-color">
                                  Reward Type
                                </label>
                                <select
                                  className="form-select login-input text-blue-color rounded-3 border-0 py-2"
                                  aria-label="Default select example"
                                  {...register("referrer_reward_type", {
                                    required: "Reward Type is required",
                                  })}
                                >
                                  <option value="">Select one</option>
                                  <option value="Meteor">Meteor</option>
                                  <option value="Star">Star</option>
                                  <option value="Cash">Cash</option>
                                  <option value="Custom">Custom</option>
                                </select>
                                {errors.referrer_reward_type && (
                                  <p className="text-danger">
                                    {errors.referrer_reward_type.message}
                                  </p>
                                )}
                              </div>

                              {/* Reward Value */}
                              <div className="col-lg-6 mb-3">
                                <label className="form-label font-12 montserrat-medium text-gray-color">
                                  Reward Value
                                </label>
                                <input
                                  type="text"
                                  placeholder="Select one"
                                  className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                                  {...register("referrer_reward_value", {
                                    required: "Reward Value is required",
                                  })}
                                />
                                {errors.referrer_reward_value && (
                                  <p className="text-danger">
                                    {errors.referrer_reward_value.message}
                                  </p>
                                )}
                              </div>

                              {/* Referree’s Reward */}
                              <p className="font-18 montserrat-semibold text-gray-color mb-0">
                                Referree’s Reward
                              </p>

                              {/* Reward Type */}
                              <div className="col-lg-6 mb-3">
                                <label className="form-label font-12 montserrat-medium text-gray-color">
                                  Reward Type
                                </label>
                                <select
                                  className="form-select login-input text-blue-color rounded-3 border-0 py-2"
                                  aria-label="Default select example"
                                  {...register("referee_reward_type", {
                                    required: "Reward Type is required",
                                  })}
                                >
                                  <option value="">Select one</option>
                                  <option value="Meteor">Meteor</option>
                                  <option value="Star">Star</option>
                                  <option value="Cash">Cash</option>
                                  <option value="Custom">Custom</option>
                                </select>
                                {errors.referee_reward_type && (
                                  <p className="text-danger">
                                    {errors.referee_reward_type.message}
                                  </p>
                                )}
                              </div>

                              {/* Reward Value */}
                              <div className="col-lg-6 mb-3">
                                <label className="form-label font-12 montserrat-medium text-gray-color">
                                  Reward Value
                                </label>
                                <input
                                  type="text"
                                  placeholder="Select one"
                                  className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                                  {...register("referee_reward_value", {
                                    required: "Reward Value is required",
                                  })}
                                />
                                {errors.referee_reward_value && (
                                  <p className="text-danger">
                                    {errors.referee_reward_value.message}
                                  </p>
                                )}
                              </div>

                              {/* Reward Condition */}
                              <p className="font-18 montserrat-semibold text-gray-color mb-0">
                                Reward Condition
                              </p>
                              <div className="col-lg-12 mb-3">
                                <label className="form-label font-12 montserrat-medium text-gray-color">
                                  Reward Condition
                                </label>
                                <select
                                  className="form-select login-input text-blue-color rounded-3 border-0 py-2"
                                  aria-label="Default select example"
                                  {...register("reward_condition", {
                                    required: "Reward Condition is required",
                                  })}
                                >
                                  <option value="">Select one</option>
                                  <option value="On Sign up">On Sign up</option>
                                  <option value="On 10 referrals">
                                    On 10 referrals
                                  </option>
                                  <option value="When all referred users spend ₹5000 total">
                                    When all referred users spend ₹5000 total
                                  </option>
                                  <option value="On Monthly Leaderboard Ranking">
                                    On Monthly Leaderboard Ranking
                                  </option>
                                  <option value="Custom">Custom</option>
                                </select>
                                {errors.reward_condition && (
                                  <p className="text-danger">
                                    {errors.reward_condition.message}
                                  </p>
                                )}
                              </div>

                              {/* What Referrer will get */}
                              <div className="col-lg-12 mb-3">
                                <label className="form-label font-12 montserrat-medium  text-gray-color">
                                  What Referrrer will get on successfully
                                  completing the condition
                                </label>
                                <select
                                  className="form-select login-input text-blue-color rounded-3 border-0 py-2"
                                  aria-label="Default select example"
                                  {...register("success_reward", {
                                    required: "This field is required",
                                  })}
                                >
                                  <option value="">Select one</option>
                                  <option value="X % Discount on particular product">
                                    X % Discount on particular product
                                  </option>
                                  <option value="Early access to a sale or product drop">
                                    Early access to a sale or product drop
                                  </option>
                                  <option value="Double reward points">
                                    Double reward points
                                  </option>
                                  <option value="Free upgrade to a premium plan">
                                    Free upgrade to a premium plan
                                  </option>
                                  <option value="Custom">Custom</option>
                                </select>
                                {errors.success_reward && (
                                  <p className="text-danger">
                                    {errors.success_reward.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Invite Card Start Here */}
                  <div className="col-lg-6">
                    <div className="bg-white border-light-gray border-radius-12 p-4">
                      <div className="invite-card border-radius-8 text-center d-flex flex-column align-items-center justify-content-center">
                        <p className="text-white montserrat-semibold font-16">
                          Invite A Friend
                        </p>
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
                          <span className="divider-border mx-2 font-12">
                            Or
                          </span>
                        </div>

                        <button className="btn-share-via-whatsapp border-0 bg-blue-color width-40 rounded-pill poppins-regular text-white bg-primary-color font-12 py-1 my-2">
                          Share Via Whatsapp
                        </button>

                        <ul className="social-nav pl-0 d-flex justify-content-center">
                          <li className="social-list cursor-pointer">
                            <FaFacebookSquare className="text-blue-color font-18" />
                          </li>
                          <li className="social-list cursor-pointer">
                            <AiFillInstagram className="text-blue-color font-18" />
                          </li>
                          <li className="social-list cursor-pointer">
                            <FaYoutube className="text-blue-color font-18" />
                          </li>
                          <li className="social-list cursor-pointer">
                            <FaTwitterSquare className="text-blue-color font-18" />
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
                <div className="row py-4">
                  <div className="col-lg-6">
                    <div className="bg-white box-shadow border-radius-12 p-4">
                      {/* Reward form Start Here */}
                      <div className="row">
                        <p className="font-18 montserrat-semibold text-gray-color mb-0">
                          Referrer Rewards{" "}
                        </p>
                        <p className="text-blue-color font-12 montserrat-medium">
                          What referrers get for successfully referring their
                          friends{" "}
                        </p>
                        {/* Reward Type */}
                        <div className="col-lg-6 mb-3">
                          <label className="form-label font-12 montserrat-medium text-gray-color">
                            Reward Type
                          </label>
                          <select
                            className="form-select login-input text-blue-color rounded-3 border-0 py-2"
                            aria-label="Default select example"
                            {...register("refer_reward_type", {
                              required: " Reward Type is required",
                            })}
                          >
                            <option value="">Select one</option>
                            <option value="Meteor">Meteor</option>
                            <option value="Star">Star</option>
                            <option value="Cash">Cash</option>
                          </select>
                          {errors.refer_reward_type && (
                            <p className="text-danger">
                              {errors.refer_reward_type.message}
                            </p>
                          )}
                        </div>
                        {/* Reward Value */}
                        <div className="col-lg-6 mb-3">
                          <label className="form-label font-12 montserrat-medium text-gray-color">
                            Reward Value
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Value"
                            className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                            {...register("refer_reward", {
                              required: "Reward Value is required",
                            })}
                          />
                          {errors.refer_reward && (
                            <p className="text-danger">{errors.refer_reward.message}</p>
                          )}
                        </div>

                        <p className="font-18 montserrat-semibold text-gray-color mb-0">
                          Invitee Rewards
                        </p>
                        <p className="text-blue-color font-12 montserrat-medium">What do their friends get after they successfully receive their invite</p>
                        {/* Reward Type */}
                        <div className="col-lg-6 mb-3">
                          <label className="form-label font-12 montserrat-medium text-gray-color">
                            Invitee Type
                          </label>
                          <select
                            className="form-select login-input text-blue-color rounded-3 border-0 py-2"
                            aria-label="Default select example"
                            {...register("invitee_reward_type", {
                              required: " Reward Type is required",
                            })}
                          >
                            <option value="">Select one</option>
                            <option value="Meteor">Meteor</option>
                            <option value="Star">Star</option>
                            <option value="Cash">Cash</option>
                          </select>
                          {errors.invitee_reward_type && (
                            <p className="text-danger">
                              {errors.invitee_reward_type.message}
                            </p>
                          )}
                        </div>

                        {/* Reward Value */}
                        <div className="col-lg-6 mb-3">
                          <label className="form-label font-12 montserrat-medium text-gray-color">
                            Invitee Value
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Value"
                            className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                            {...register("invitee_reward", {
                              required: "Reward Value is required",
                            })}
                          />
                          {errors.invitee_reward && (
                            <p className="text-danger">{errors.invitee_reward.message}</p>
                          )}
                        </div>


                      </div>
                    </div>

                    {/* Login Sign-up Reward */}
                    <div className="bg-white box-shadow border-radius-12 p-4 mt-4">
                      <div className="row">
                        {/* Referrer’s Reward Section */}
                        <p className="font-18 montserrat-semibold text-gray-color mb-0">
                          Login Rewards
                        </p>

                        {/* Reward Type */}
                        <div className="col-lg-6 mb-3">
                          <label className="form-label font-12 montserrat-medium text-gray-color">
                            Reward Type
                          </label>
                          <select
                            className="form-select login-input text-blue-color rounded-3 border-0 py-2"
                            aria-label="Default select example"
                            {...register("login_reward_type", {
                              required: "Login Reward Type is required",
                            })}
                          >
                            <option value="">Select one</option>
                            <option value="Meteor">Meteor</option>
                            <option value="Star">Star</option>
                            <option value="Cash">Cash</option>
                            <option value="Custom">Custom</option>
                          </select>
                          {errors.login_reward_type && (
                            <p className="text-danger">
                              {errors.login_reward_type.message}
                            </p>
                          )}
                        </div>

                        {/* Reward Value */}
                        <div className="col-lg-6 mb-3">
                          <label className="form-label font-12 montserrat-medium text-gray-color">
                            Reward Value
                          </label>
                          <input
                            type="text"
                            placeholder="Select one"
                            className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                            {...register("login_reward_value", {
                              required: "Reward Value is required",
                            })}
                          />
                          {errors.login_reward_value && (
                            <p className="text-danger">
                              {errors.login_reward_value.message}
                            </p>
                          )}
                        </div>

                        {/* Referree’s Reward */}
                        <p className="font-18 montserrat-semibold text-gray-color mb-0">
                          Sign Up Reward
                        </p>

                        {/* Reward Type */}
                        <div className="col-lg-6 mb-3">
                          <label className="form-label font-12 montserrat-medium text-gray-color">
                            Reward Type
                          </label>
                          <select
                            className="form-select login-input text-blue-color rounded-3 border-0 py-2"
                            aria-label="Default select example"
                            {...register("signup_reward_type", {
                              required: "Reward Type is required",
                            })}
                          >
                            <option value="">Select one</option>
                            <option value="Meteor">Meteor</option>
                            <option value="Star">Star</option>
                            <option value="Cash">Cash</option>
                            <option value="Custom">Custom</option>
                          </select>
                          {errors.signup_reward_type && (
                            <p className="text-danger">
                              {errors.signup_reward_type.message}
                            </p>
                          )}
                        </div>

                        {/* Reward Value */}
                        <div className="col-lg-6 mb-3">
                          <label className="form-label font-12 montserrat-medium text-gray-color">
                            Reward Value
                          </label>
                          <input
                            type="text"
                            placeholder="Select one"
                            className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                            {...register("signup_reward_value", {
                              required: "Reward Value is required",
                            })}
                          />
                          {errors.signup_reward_value && (
                            <p className="text-danger">
                              {errors.signup_reward_value.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Set Conversion Rate */}
                    <div className="bg-white box-shadow border-radius-12 p-4 mt-4">
                      <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                        Set Conversion rates
                      </p>
                      <p className="text-blue-color font-12 montserrat-medium">
                        Define how users can convert their meteors into stars
                        and then into rewards
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
                              {...register("meteor", {
                                required: "meteor is required",
                              })}
                            />
                            {errors.meteor && (
                              <p className="text-danger">
                                {errors.meteor.message}
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
                              {...register("y_star", {
                                required: "y_star is required",
                              })}
                            />
                            {errors.y_star && (
                              <p className="text-danger">
                                {errors.y_star.message}
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
                              {...register("star", {
                                required: "star is required",
                              })}
                            />
                            {errors.star && (
                              <p className="text-danger">
                                {errors.star.message}
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
                              {...register("point", {
                                required: "point is required",
                              })}
                            />
                            {errors.point && (
                              <p className="text-danger">
                                {errors.point.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Invite Card Start Here */}
                  <div className="col-lg-6">
                    <div className="bg-white border-light-gray border-radius-12 p-4">
                      <div className="invite-card border-radius-8 text-center d-flex flex-column align-items-center justify-content-center">
                        <p className="text-white montserrat-semibold font-16">
                          Invite A Friend
                        </p>
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
                          <span className="divider-border mx-2 font-12">
                            Or
                          </span>
                        </div>

                        <button className="btn-share-via-whatsapp border-0 bg-blue-color width-40 rounded-pill poppins-regular text-white bg-primary-color font-12 py-1 my-2">
                          Share Via Whatsapp
                        </button>

                        <ul className="social-nav pl-0 d-flex justify-content-center">
                          <li className="social-list cursor-pointer">
                            <FaFacebookSquare className="text-blue-color font-18" />
                          </li>
                          <li className="social-list cursor-pointer">
                            <AiFillInstagram className="text-blue-color font-18" />
                          </li>
                          <li className="social-list cursor-pointer">
                            <FaYoutube className="text-blue-color font-18" />
                          </li>
                          <li className="social-list cursor-pointer">
                            <FaTwitterSquare className="text-blue-color font-18" />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default CampaignForm;
