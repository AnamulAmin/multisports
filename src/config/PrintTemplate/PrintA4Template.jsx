// Import the CSS file for styling
import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import useGetGeneralInfo from "../../Hook/GetPublicDataHook/useGetGeneralInfo";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import A4PrintContent from "./A4PrintTemplate/A4PrintContent";

function PrintA4Template({ setIsShowPrint, data }) {
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
    <div className="w-full  relative rounded-xl">
      <ReactToPrint
        trigger={() => (
          <button
            // onClick={reactToPrintFn}
            className="btn btn-success absolute top-2 right-4 z-30 "
          >
            Print
          </button>
        )}
        content={() => ref.current}
      />
      <div className="mx-auto flex justify-center pt-16 w-full bg-white">
        <A4PrintContent ref={ref} profileData={profileData} data={data} />
      </div>
    </div>
  );
}

export default PrintA4Template;
