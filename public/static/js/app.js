$(function () {
  $("#select_tags").on("change", function () {
    const target = $(this).find(":selected").val();
    console.log("target: ", target);
    $("html").animate(
      {
        scrollTop: $(`#${target}`).offset().top,
      },
      0 //speed
    );
  });

  $("#demo-sidebar li").each(function (index, element) {
    const button = $(this).find("button");
    button.on("click", function (event) {
      $(this).addClass("text-blue-500");
      $(element).siblings().find("button").removeClass("text-blue-500");
    });
  });
});
