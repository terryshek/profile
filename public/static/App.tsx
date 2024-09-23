// Compare this snippet from src/page/Scroll.tsx:
$(function () {
  console.log("ready!");
  $("#default-styled-tab li").each(function (index, element) {
    const button = $(element).find("button");
    button.on("click", function (event) {
      $(this).addClass("text-blue-500");
      $(element).siblings().find("button").removeClass("text-blue-500");
      const content = $("#default-styled-tab-content")[0];
      console.log("content: ", content);
      //   .eq(index)
      //   .addClass("block")
      //   .removeClass("hidden");
      // content.text($(this).);
    });
  });
});
