import { ROUTES } from "../../utils/routes";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { useAuth } from "../../../providers/AuthProvider";
import { useState } from "react";
import AvatarEditorComponent from "../../../helpers/AvatarEditorComponent";
import Modal from "../../partial/Modal/Modal";
import CustomImage from "../../../shared/ImageComponents/CustomImage";

export default function AccountDashboard() {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [isShowEditor, setIsShowEditor] = useState(false);
  return (
    <div className="px-5 ">
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-3 xl:mb-5 relative">
        Dashboard
      </h2>
      <div className="avatar placeholder mb-5">
        <div className="bg-neutral text-neutral-content w-32 rounded-full">
          {user?.photourl ? (
            <CustomImage imageKey={user?.photourl} />
          ) : (
            <span className="text-3xl">{user?.username[0]}</span>
          )}
        </div>
        <button
          className="absolute right-0 top-0 p-2 bg-white rounded-full"
          onClick={() => setIsShowEditor(true)}
        >
          <FaRegEdit />
        </button>
      </div>
      <p className=" text-sm leading-7 md:text-base md:leading-loose lowercase">
        From your account dashboard you can view your
        <Link
          to={ROUTES.ORDERS}
          className="text-heading underline font-semibold"
        >
          recent orders
        </Link>
        , manage your
        <Link
          to={ROUTES.ACCOUNT_DETAILS}
          className="text-heading underline font-semibold"
        >
          Account Details
        </Link>
        and
        <Link
          to={ROUTES.CHANGE_PASSWORD}
          className="text-heading underline font-semibold"
        >
          change your password
        </Link>
        .
      </p>

      <Modal isShowModal={isShowEditor} setIsShowModal={setIsShowEditor}>
        <AvatarEditorComponent
          image={image}
          setImage={setImage}
          setIsShow={setIsShowEditor}
          isShow={isShowEditor}
        />
      </Modal>
    </div>
  );
}
