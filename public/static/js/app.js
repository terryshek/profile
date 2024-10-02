window.jsPDF = window.jspdf.jsPDF;
$(function () {
  $("#select_tags").on("change", function () {
    const target = $(this).find(":selected").val();
    $("html").animate(
      {
        scrollTop: $(`#${target}`).offset().top,
      },
      0 //speed
    );
  });
  // $(".topContent").on("click", function () {
  //   const targetElement = document.body;
  //   if (targetElement) {
  //     // convert that Element to canvas
  //     html2canvas(targetElement, {
  //       logging: true,
  //       useCORS: true,
  //     }).then((canvas) => {
  //       // once the Element has been successfully converted to canvas
  //       // set the width and height of canvas
  //       const imgWidth = 208;
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //       // convert canvas to png image
  //       const imgData = canvas.toDataURL("img/png");
  //       // initialize a new PDF object
  //       const pdf = new jsPDF("p", "mm", "a4");
  //       // convert that png image into pdf
  //       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  //       // download the pdf
  //       pdf.save("name-of-pdf-here");
  //     });
  //   }
  // });

  $("#demo-sidebar li").each(function (index, element) {
    const button = $(this).find("button");
    button.on("click", function (event) {
      $(this).addClass("text-blue-500");
      $(element).siblings().find("button").removeClass("text-blue-500");
    });
  });
});
