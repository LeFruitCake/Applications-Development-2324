


export default function getFileType(filename){
    if (filename.includes("pdf")) {
      return "red"
    } else if (filename.includes("pptx")) {
      return "rgb(240, 104, 0)"
    } else if (filename.includes("xlsx" || filename.includes("xlsb"))) {
      return "green"
    } else if (filename.includes("docx")) {
      return "steelblue"
    } else if (filename.includes("jpg") || filename.includes("jpeg") || filename.includes("png")) {
      return "rgb(10, 26, 46)"
    } else {
      return "black"
    }
  }