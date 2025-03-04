// Import the CSS file for styling
import "./PrintTemplate.css";
import ThermalPrint from "./ThermalPrint";
import ReceiptTemplate from "./ReceiptTemplate";
import { set } from "react-hook-form";
import { Oval } from "react-loader-spinner";

import React, { forwardRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import useGetGeneralInfo from "../../Hook/GetPublicDataHook/useGetGeneralInfo";
import ReactToPrint, { useReactToPrint } from "react-to-print";

function PrintTemplate({ setIsShowPrint, data }) {
  const profileData = useGetGeneralInfo({});
  const ref = React.useRef();
  const reactToPrintFn = useReactToPrint({
    content: () => ref.current,
  });

  const handlePrint = async () => {
    const element = ref.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("receipt.pdf");
  };

  return (
    <div className="bg-slate-300 p-8 relative rounded-xl">
      <ReactToPrint
        trigger={() => (
          <button
            // onClick={reactToPrintFn}
            className="btn btn-success absolute top-4 right-4"
          >
            Print
          </button>
        )}
        content={() => ref.current}
      />
      <ReceiptTemplate ref={ref} profileData={profileData} data={data} />
    </div>
  );
}

export default PrintTemplate;
