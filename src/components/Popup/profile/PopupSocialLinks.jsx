import React, { useState, useEffect } from "react";
import Images from "../../../assets";
import AddButton from "./Social/AddButton"; // Make sure this import is correct
import SocialLinkFormPopup from "./Social/SocialLinkFormPopup";
import CloseButton from "../../Button/CloseButton";
import { Updatesocialsseer } from "../../../Data/Profile/ProfileApi"; // Import Updatesocialsseer

const PopupSocialLinks = ({ isOpen, onClose, socialName, socialLink }) => {
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [currentLinkData, setCurrentLinkData] = useState({ name: "", url: "" });
  const [popupTitle, setPopupTitle] = useState("");
  const [social, setSocial] = useState([]); // Store social data

  useEffect(() => {
    if (socialName && socialLink) {
      setSocial([{ name: socialName, url: socialLink }]);
      setCurrentLinkData({ name: socialName, url: socialLink }); // Set initial values
    }
  }, [socialName, socialLink]);

  const handleEditLink = (name, url) => {
    setCurrentLinkData({ name, url });
    setPopupTitle(`อัปเดตลิงก์ ${name}`);
    setShowFormPopup(true);
  };

  const handleAddNewLink = () => {
    setCurrentLinkData({ name: "", url: "" });
    setPopupTitle("เพิ่มลิงก์ใหม่");
    setShowFormPopup(true);
  };

  const formatURL = (url) => {
    return url.replace(/^https?:\/\/(www\.)?/, ""); // ลบ https:// หรือ http:// และ www.
  };

  const handleSaveLink = async (newLink) => {
    try {
      // Update or add new social link
      if (currentLinkData.name) {
        // Edit existing link
        const updatedLinks = social.map((link) =>
          link.name === currentLinkData.name ? { ...link, ...newLink } : link
        );
        setSocial(updatedLinks);
      } else {
        // Add new social link
        setSocial((prevLinks) => [...prevLinks, newLink]);
      }

      // Call API to update social data
      await Updatesocialsseer({ name: newLink.name, url: newLink.url });

      setShowFormPopup(false); // Close popup after saving
    } catch (error) {
      console.error("Failed to save social link:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white px-[50px] py-[30px] rounded-lg w-[550px] shadow-lg">
        {showFormPopup ? (
          <SocialLinkFormPopup
            isOpen={showFormPopup}
            onClose={() => setShowFormPopup(false)}
            onSave={handleSaveLink}
            name={currentLinkData.name}
            url={currentLinkData.url}
            title={popupTitle}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-[28px] font-semibold text-primary">
                ช่องทางการติดตาม
              </h2>
            </div>

            <ul className="mb-4">
              {social.length > 0 ? (
                social.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => handleEditLink(link.name, link.url)}
                    className="flex w-full border-b py-2 hover:bg-black/10"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={Images.LinkIcon} // เปลี่ยนเป็นรูปไอคอนที่เหมาะสม
                        alt="socailIcon"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex flex-col items-start">
                        <p className="text-gray-800 font-medium">{link.name}</p>
                        <p className="text-gray-500 text-[18px]">{formatURL(link.url)}</p>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-gray-500">ไม่มีข้อมูลบัญชี</p>
              )}
            </ul>

            {social.length === 0 && (
              <AddButton
                icon={Images.PlusIcon}
                label="เพิ่มช่องทาง"
                onClick={handleAddNewLink}
              />
            )}
          </>
        )}

        {!showFormPopup && (
          <div className="flex justify-end mt-6">
            <CloseButton onClose={onClose} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupSocialLinks;
