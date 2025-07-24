// // import React, { useState } from "react";
// // import {
// //   IoChevronDown,
// //   IoAdd,
// //   IoHelpCircleOutline,
// //   IoFlash,
// //   IoSettingsSharp,
// // } from "react-icons/io5";
// // import { BsPencilSquare } from "react-icons/bs";

// // const CampaignDashboard = () => {
// //   const [activeTab, setActiveTab] = useState("My Campaigns");

// //   const campaigns = [
// //     {
// //       id: 1,
// //       name: "Skill",
// //       subtitle: "The Universal Referral",
// //       url: "https://pages.viral-loops.com/skill...",
// //       totalParticipations: 0,
// //       avatar: "👑",
// //     },
// //     {
// //       id: 2,
// //       name: "Skill",
// //       subtitle: "The Universal Referral",
// //       url: "https://pages.viral-loops.com/skill...",
// //       totalParticipations: 0,
// //       avatar: "👑",
// //     },
// //   ];

// //   return (
// //     <>
// //       {/* Bootstrap 5 CDN */}

// //       <div className="min-vh-100 bg-light">
// //         {/* Header */}
// //         <header className="bg-white border-bottom">
// //           <div className="container-fluid">
// //             <div className="row align-items-center py-3">
// //               <div className="col-auto d-flex align-items-center gap-4">
// //                 <nav className="nav nav-pills">
// //                   <button
// //                     className={`nav-link ${
// //                       activeTab === "My Campaigns" ? "active" : ""
// //                     } px-3 py-2`}
// //                     onClick={() => setActiveTab("My Campaigns")}
// //                   >
// //                     My Campaigns
// //                   </button>
// //                 </nav>

// //                 <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
// //                   <IoAdd size={16} />
// //                   Create
// //                 </button>
// //               </div>

// //               <div className="col d-flex align-items-center justify-content-end gap-3">
// //                 <div className="dropdown">
// //                   <button
// //                     className="btn btn-outline-light border-0 d-flex align-items-center gap-2"
// //                     data-bs-toggle="dropdown"
// //                   >
// //                     <div
// //                       className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
// //                       style={{
// //                         width: "32px",
// //                         height: "32px",
// //                         fontSize: "14px",
// //                       }}
// //                     >
// //                       R
// //                     </div>
// //                     <span className="fw-medium text-dark">Razik</span>
// //                     <IoChevronDown size={16} />
// //                   </button>
// //                    <ul className="dropdown-menu dropdown-menu-end">
// //                     <li><a className="dropdown-item" href="#">Profile</a></li>
// //                     <li><a className="dropdown-item" href="#">Settings</a></li>
// //                     <li><hr className="dropdown-divider" /></li>
// //                     <li><a className="dropdown-item text-danger" href="#">Logout</a></li>
// //                   </ul>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </header>

// //         {/* Main Content */}
// //         <main className="container-fluid py-4">
// //           <div className="row d-flex justify-content-center align-items-center">
// //             <div className="col-9">
// //               <h2 className="h4 fw-semibold text-dark mb-4">Draft Campaigns</h2>

// //               <div className="d-flex flex-column gap-3">
// //                 {campaigns.map((campaign) => (
// //                   <div
// //                     key={campaign.id}
// //                     className="card border-1 hover-shadow transition"
// //                   >
// //                     <div className="card-body p-4">
// //                       <div className="row align-items-center">
// //                         <div className="col-auto d-flex align-items-center gap-3">
// //                           <div
// //                             className="bg-purple text-white rounded-circle d-flex align-items-center justify-content-center"
// //                             style={{
// //                               width: "48px",
// //                               height: "48px",
// //                               fontSize: "20px",
// //                             }}
// //                           >
// //                             {campaign.avatar}
// //                           </div>
// //                           <div>
// //                             <h5 className="mb-1 fw-semibold">
// //                               {campaign.name}
// //                             </h5>
// //                             <p className="mb-1 text-muted small">
// //                               {campaign.subtitle}
// //                             </p>
// //                             <p
// //                               className="mb-0 text-muted"
// //                               style={{ fontSize: "12px" }}
// //                             >
// //                               {campaign.url}
// //                             </p>
// //                           </div>
// //                         </div>

// //                         <div className="col-auto mx-auto">
// //                           <div className="text-center">
// //                             <div className="small text-muted mb-1">
// //                               Total Participations
// //                             </div>
// //                             <div className="h3 fw-bold mb-0">
// //                               {campaign.totalParticipations}
// //                             </div>
// //                           </div>
// //                         </div>

// //                         <div className="col-auto">
// //                           <div className="d-flex gap-2">
// //                             <button className="btn btn-outline-secondary">
// //                               Dashboard
// //                             </button>
// //                             <div className="dropdown">
// //                               <button
// //                                 className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1"
// //                                 data-bs-toggle="dropdown"
// //                               >
// //                                 Edit
// //                               </button>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </main>

// //         {/* Footer */}
// //         <footer className="bg-light border-top fixed-bottom">
// //           <div className="container-fluid py-3">
// //             <div className="row align-items-center">
// //               <div className="col-auto d-flex align-items-center gap-3">
// //                 <span className="fw-semibold">viral.loops</span>
// //                 <span className="small text-muted">
// //                   ©2025 Viral Loops. All rights reserved. Terms and Privacy
// //                 </span>
// //               </div>

// //               <div className="col d-flex justify-content-end">
// //                 <div className="text-end">
// //                   <div className="fw-medium">Activate Windows</div>
// //                   <div className="small text-muted">
// //                     Go to Settings to activate Windows.
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </footer>
// //       </div>
// //     </>
// //   );
// // };

// // export default CampaignDashboard;

// import React, { useState } from "react";
// import {
//   IoChevronDown,
//   IoAdd,
//   IoHelpCircleOutline,
//   IoFlash,
//   IoSettingsSharp,
//   IoClose,
// } from "react-icons/io5";
// import { BsPencilSquare } from "react-icons/bs";

// const CampaignDashboard = () => {
//   const [activeTab, setActiveTab] = useState("My Campaigns");
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     subtitle: "",
//     url: "",
//     avatar: "👑"
//   });

//   const campaigns = [
//     {
//       id: 1,
//       name: "Skill",
//       subtitle: "The Universal Referral",
//       url: "https://pages.viral-loops.com/skill...",
//       totalParticipations: 0,
//       avatar: "👑",
//     },
//     {
//       id: 2,
//       name: "Skill",
//       subtitle: "The Universal Referral",
//       url: "https://pages.viral-loops.com/skill...",
//       totalParticipations: 0,
//       avatar: "👑",
//     },
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Creating campaign:", formData);
//     // Here you would typically send the data to your backend
//     setShowModal(false);
//     setFormData({
//       name: "",
//       subtitle: "",
//       url: "",
//       avatar: "👑"
//     });
//   };

//   return (
//     <>
//       <div className="min-vh-100 bg-light">
//         {/* Header */}
//         <header className="bg-white border-bottom">
//           <div className="container-fluid">
//             <div className="row align-items-center py-3">
//               <div className="col-auto d-flex align-items-center gap-4">
//                 <nav className="nav nav-pills">
//                   <button
//                     className={`nav-link ${
//                       activeTab === "My Campaigns" ? "active" : ""
//                     } px-3 py-2`}
//                     onClick={() => setActiveTab("My Campaigns")}
//                   >
//                     My Campaigns
//                   </button>
//                 </nav>

//                 <button
//                   className="btn btn-outline-secondary d-flex align-items-center gap-2"
//                   onClick={() => setShowModal(true)}
//                 >
//                   <IoAdd size={16} />
//                   Create
//                 </button>
//               </div>

//               <div className="col d-flex align-items-center justify-content-end gap-3">
//                 <div className="dropdown">
//                   <button
//                     className="btn btn-outline-light border-0 d-flex align-items-center gap-2"
//                     data-bs-toggle="dropdown"
//                   >
//                     <div
//                       className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
//                       style={{
//                         width: "32px",
//                         height: "32px",
//                         fontSize: "14px",
//                       }}
//                     >
//                       R
//                     </div>
//                     <span className="fw-medium text-dark">Razik</span>
//                     <IoChevronDown size={16} />
//                   </button>
//                    <ul className="dropdown-menu dropdown-menu-end">
//                     <li><a className="dropdown-item" href="#">Profile</a></li>
//                     <li><a className="dropdown-item" href="#">Settings</a></li>
//                     <li><hr className="dropdown-divider" /></li>
//                     <li><a className="dropdown-item text-danger" href="#">Logout</a></li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="container-fluid py-4">
//           <div className="row d-flex justify-content-center align-items-center">
//             <div className="col-9">
//               <h2 className="h4 fw-semibold text-dark mb-4">Draft Campaigns</h2>

//               <div className="d-flex flex-column gap-3">
//                 {campaigns.map((campaign) => (
//                   <div
//                     key={campaign.id}
//                     className="card border-1 hover-shadow transition"
//                   >
//                     <div className="card-body p-4">
//                       <div className="row align-items-center">
//                         <div className="col-auto d-flex align-items-center gap-3">
//                           <div
//                             className="bg-purple text-white rounded-circle d-flex align-items-center justify-content-center"
//                             style={{
//                               width: "48px",
//                               height: "48px",
//                               fontSize: "20px",
//                             }}
//                           >
//                             {campaign.avatar}
//                           </div>
//                           <div>
//                             <h5 className="mb-1 fw-semibold">
//                               {campaign.name}
//                             </h5>
//                             <p className="mb-1 text-muted small">
//                               {campaign.subtitle}
//                             </p>
//                             <p
//                               className="mb-0 text-muted"
//                               style={{ fontSize: "12px" }}
//                             >
//                               {campaign.url}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="col-auto mx-auto">
//                           <div className="text-center">
//                             <div className="small text-muted mb-1">
//                               Total Participations
//                             </div>
//                             <div className="h3 fw-bold mb-0">
//                               {campaign.totalParticipations}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="col-auto">
//                           <div className="d-flex gap-2">
//                             <button className="btn btn-outline-secondary">
//                               Dashboard
//                             </button>
//                             <div className="dropdown">
//                               <button
//                                 className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1"
//                                 data-bs-toggle="dropdown"
//                               >
//                                 Edit
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </main>

//         {/* Footer */}
//         <footer className="bg-light border-top fixed-bottom">
//           <div className="container-fluid py-3">
//             <div className="row align-items-center">
//               <div className="col-auto d-flex align-items-center gap-3">
//                 <span className="fw-semibold">viral.loops</span>
//                 <span className="small text-muted">
//                   ©2025 Viral Loops. All rights reserved. Terms and Privacy
//                 </span>
//               </div>

//               <div className="col d-flex justify-content-end">
//                 <div className="text-end">
//                   <div className="fw-medium">Activate Windows</div>
//                   <div className="small text-muted">
//                     Go to Settings to activate Windows.
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </footer>

//         {/* Create Campaign Modal */}
//         {showModal && (
//           <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//             <div className="modal-dialog modal-lg modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header border-0 pb-0">
//                   <h5 className="modal-title fw-semibold">Create New Campaign</h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => setShowModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body pt-3">
//                   <div>
//                     <div className="mb-3">
//                       <label htmlFor="campaignName" className="form-label fw-medium">
//                         Campaign Name
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="campaignName"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         placeholder="Enter campaign name"
//                       />
//                     </div>

//                     <div className="mb-3">
//                       <label htmlFor="campaignSubtitle" className="form-label fw-medium">
//                         Subtitle
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="campaignSubtitle"
//                         name="subtitle"
//                         value={formData.subtitle}
//                         onChange={handleInputChange}
//                         placeholder="Enter campaign subtitle"
//                       />
//                     </div>

//                     <div className="mb-3">
//                       <label htmlFor="campaignUrl" className="form-label fw-medium">
//                         Campaign URL
//                       </label>
//                       <input
//                         type="url"
//                         className="form-control"
//                         id="campaignUrl"
//                         name="url"
//                         value={formData.url}
//                         onChange={handleInputChange}
//                         placeholder="https://pages.viral-loops.com/..."
//                       />
//                     </div>

//                     <div className="mb-4">
//                       <label htmlFor="campaignAvatar" className="form-label fw-medium">
//                         Avatar
//                       </label>
//                       <select
//                         className="form-select"
//                         id="campaignAvatar"
//                         name="avatar"
//                         value={formData.avatar}
//                         onChange={handleInputChange}
//                       >
//                         <option value="👑">👑 Crown</option>
//                         <option value="🚀">🚀 Rocket</option>
//                         <option value="⭐">⭐ Star</option>
//                         <option value="💎">💎 Diamond</option>
//                         <option value="🎯">🎯 Target</option>
//                         <option value="🔥">🔥 Fire</option>
//                         <option value="💡">💡 Lightbulb</option>
//                         <option value="⚡">⚡ Lightning</option>
//                       </select>
//                     </div>

//                     <div className="d-flex justify-content-end gap-2">
//                       <button
//                         type="button"
//                         className="btn btn-outline-secondary"
//                         onClick={() => setShowModal(false)}
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="button"
//                         className="btn btn-primary d-flex align-items-center gap-2"
//                         onClick={handleSubmit}
//                       >
//                         <IoAdd size={16} />
//                         Create Campaign
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         .bg-purple {
//           background-color: #6f42c1;
//         }
//         .hover-shadow:hover {
//           box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
//         }
//         .transition {
//           transition: all 0.2s ease-in-out;
//         }
//       `}</style>
//     </>
//   );
// };

// export default CampaignDashboard;

import React, { useEffect, useState, useContext } from "react";
import {
  IoChevronDown,
  IoAdd,
  IoHelpCircleOutline,
  IoFlash,
  IoSettingsSharp,
  IoClose,
} from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { postData } from "../../services/api";
import { DecryptFunction } from "../../utils/decryptFunction";
import { toastError, toastSuccess } from "../../utils/toster";
import { UserContext } from "../../utils/UseContext/useContext";

// Images
import Logo1 from "../../assets/images/Dashboard-img/group 1.svg";
import Logo2 from "../../assets/images/Dashboard-img/TrendUp.svg"
import CampaignNavbar from "../../components/campaignNavbar";

const CampaignDashboard = () => {
  const [activeTab, setActiveTab] = useState("My Campaigns");
  const [campList, setcampList] = useState();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    url: "",
    logo: null,
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const GetAdminUid = sessionStorage.getItem("Auth");
  const { setLogo,ContextToEditForm, setContextToEditForm } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (file.type.startsWith("image/")) {
        setFormData((prev) => ({
          ...prev,
          logo: file,
        }));

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setLogoPreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a valid image file (PNG, JPG, GIF, etc.)");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating campaign:", formData);
    // Here you would typically send the data to your backend
    setShowModal(false);
    setFormData({
      name: "",
      subtitle: "",
      url: "",
      logo: null,
    });
    setLogoPreview(null);
  };


  // =================
  // API FUNCTIONALITY
  // =================

  const HandleMainDashdAPI = async () => {
    try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });
      const payload = {
        admin_uid: GetAdminUid,
        mode: getAuth?.mode,
        log_alt: getAuth?.log_alt,
      };
      const response = await postData("/admin/list-all-campaigns", payload);
      setcampList(response?.all_campaigns);
      // const Decrpt = await DecryptFunction(response?.data);
    } catch (error) {
      toastError();
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    HandleMainDashdAPI();
  }, []);
  return (
    <>
      <div className="min-vh-100 bg-light">
        {/* Header */}
        <CampaignNavbar />

        {/* Main Content */}
        <main className="container-fluid py-4">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-9">
              {/* <h2 className="h4 fw-semibold text-dark mb-4">Draft Campaigns</h2> */}
              <p className="text-blue-color font-24 montserrat-semibold mb-0">All Campaigns</p>
              <p className="text-blue-color font-12 montserrat-medium">Create, manage, and monitor all your campaigns from one place.</p>

              <div className="d-flex flex-column gap-3">
                {campList?.map((campaign, index) => (
                  <div
                    key={index}
                    className="card campaign-card border-radius-12 border-0 hover-shadow transition"
                  >
                    <div className="card-body px-4 py-3">
                      <div className="row align-items-center">
                        <div className="col-auto d-flex align-items-center gap-3">
                          <div
                            className="campaign-img text-white rounded-circle d-flex align-items-center justify-content-center overflow-hidden">
                            <img src={campaign?.image} className="logo" alt="Logo" />
                          </div>
                          <div>
                            <h5 className="mb-0 text-blue-color font-28 montserrat-semibold">
                              {campaign?.program_name}
                            </h5>
                            {/* {/* <p className="mb-1 text-muted small">
                              {campaign.subtitle}
                            </p> */}
                            <p
                              className="mb-0 text-muted"
                              style={{ fontSize: "12px" }}
                            >
                              {campaign?.base_url}
                            </p>
                          </div>
                        </div>

                        <div className="col-auto mx-auto">
                          <div className="text-center text-blue-color">
                            <div className="font-32 montserrat-semibold mb-0">
                              {campaign?.total_participants}
                            </div>
                            <div className="small font-16 montserrat-medium">
                              Total Participations
                            </div>
                          </div>
                        </div>

                        <div className="col-auto">
                          <div className="d-flex gap-2">
                            <NavLink to="/dashboard">
                              <button
                                onClick={() => {
                                  sessionStorage.setItem("Prgid", campaign?.program_id);
                                  sessionStorage.setItem("campaignName", campaign?.program_name);
                                  setLogo(campaign?.image);
                                  localStorage.setItem("logo", campaign?.image);
                                }}
                                className="rounded-pill bg-purple-color border-0 px-4 py-2 font-14 montserrat-medium text-white"
                              >
                                Dashboard
                              </button>
                            </NavLink>
                            <NavLink to={"/campaignform"}>
                              <button
                                className="border-purple text-purple-color font-14 montserrat-medium rounded-pill bg-transparent px-4 py-2"
                                onClick={()=>setContextToEditForm(true)}
                              >
                                Edit
                              </button>
                            </NavLink>
                            {/* </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main >

        {/* Footer */}
        {/* <footer className="bg-light border-top fixed-bottom">
          <div className="container-fluid py-3">
            <div className="row align-items-center">
              <div className="col-auto d-flex align-items-center gap-3">
                <span className="fw-semibold">viral.loops</span>
                <span className="small text-muted">
                  ©2025 Viral Loops. All rights reserved. Terms and Privacy
                </span>
              </div>

              <div className="col d-flex justify-content-end">
                <div className="text-end">
                  <div className="fw-medium">Activate Windows</div>
                  <div className="small text-muted">
                    Go to Settings to activate Windows.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer> */}

        {/* Create Campaign Modal */}
        {
          showModal && (
            <div
              className="modal fade show d-block"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header border-0 pb-0">
                    <h5 className="modal-title fw-semibold">
                      Create New Campaign
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body pt-3">
                    <div>
                      <div className="mb-3">
                        <label
                          htmlFor="campaignName"
                          className="form-label fw-medium"
                        >
                          Campaign Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="campaignName"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter campaign name"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="campaignSubtitle"
                          className="form-label fw-medium"
                        >
                          Subtitle
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="campaignSubtitle"
                          name="subtitle"
                          value={formData.subtitle}
                          onChange={handleInputChange}
                          placeholder="Enter campaign subtitle"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="campaignUrl"
                          className="form-label fw-medium"
                        >
                          Campaign URL
                        </label>
                        <input
                          type="url"
                          className="form-control"
                          id="campaignUrl"
                          name="url"
                          value={formData.url}
                          onChange={handleInputChange}
                          placeholder="https://pages.viral-loops.com/..."
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-medium">
                          Company Logo
                        </label>
                        <div className="d-flex align-items-center gap-3">
                          {logoPreview ? (
                            <div className="position-relative">
                              <img
                                src={logoPreview}
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
                                onClick={() => {
                                  setLogoPreview(null);
                                  setFormData((prev) => ({
                                    ...prev,
                                    logo: null,
                                  }));
                                }}
                              >
                                <IoClose size={14} />
                              </button>
                            </div>
                          ) : (
                            <div
                              className="border border-2 border-dashed rounded d-flex align-items-center justify-content-center text-muted"
                              style={{
                                width: "64px",
                                height: "64px",
                              }}
                            >
                              <span style={{ fontSize: "24px" }}>+</span>
                            </div>
                          )}
                          <div className="flex-grow-1">
                            <input
                              type="file"
                              className="form-control"
                              accept="image/*"
                              onChange={handleLogoUpload}
                            />
                            <div className="form-text">
                              Upload PNG, JPG, or GIF. Max size: 2MB
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary d-flex align-items-center gap-2"
                          onClick={handleSubmit}
                        >
                          <IoAdd size={16} />
                          Create Campaign
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div >
      {/* 
      <style jsx>{`
        .bg-purple {
          background-color: #6f42c1;
        }
        .hover-shadow:hover {
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        }
        .transition {
          transition: all 0.2s ease-in-out;
        }
      `}</style> */}
    </>
  );
};

export default CampaignDashboard;
