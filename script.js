$(document).ready(function () {
    /*
     * Main variables
     */
    var content = [{
        title: "My Lil' Ghost",
        desc: "✨Beauty in the Brain ✨"
    }, {
        title: "",
        desc: "rinn kitakan udah sering chatan dan lumayan intens ya? menurutku iya sih, sebenarnya, aku udah lama tertarik sama kamu rin. dari pertama kali kita belajar bareng buat olimpiade sampai lihat kamu juara waktu itu, aku selalu kagum. kamu itu pinter, imut, dan punya sesuatu yang bikin orang susah buat ngga terpesona. ada satu hal yang bikin aku penasaran. aku ngerasa setiap kali kamu lihat aku, tatapanmu lama banget, kayak lagi lihat hantu. entah itu cuma perasaanku atau emang aku ada yang aneh? haha tapi ya, gapapa sih, mau diliatin kayak gimana pun, aku tetap suka lihat kamu apalagi jadi versi terbaik dari diri kamu rinn.."
    }, {
        title: "",
        desc: "ngga cuma itu, aku juga mau menyampaikan sesuatu yang sebenarnya lebih ingin aku sampaikan langsung yang mungkin kamu ngga ada waktu, jadi aku ungkapin di sini aja. aku terus terang aja, aku mau confess ke kamu rinn. mungkin menyatakan perasaan itu hal yang cukup serius, banyak yang akan dikorbankan, dan hasil akhirnya bisa macam2. tapi setidaknya, buat aku, melepas sesuatu yang udah lama tersimpan itu melegakan, meskipun bukan hal yang mudah. masalah diterima atau engga, itu tergantung kamu dan aku juga nggak bakal berharap lebih kok."
    }, {
        title: "",
        desc: "yah, mungkin aku juga udah mau lulus ga lama lagi. tapi sebelum kelulusan itu, aku cuma mau jujur… I have a crush on you. kalau kamu risih, bilang aja ya (walaupun aku yakin engga sih wkwkwk). tapi kalau ternyata kamu udah punya pacar, maaf ya karena aku confess ke kamu... mungkin segitu aja dari aku. hehehe, makasih ya udah mau baca✨"
    }, {
        title: "I Have Crush On You ❤️!!",
        desc: "Aku tunggu Balasan dari kamu rinn💫"
    }];
    var currentPage = 0;

    // Generate content
    for (var i = 0; i < content.length; i++) {
        // Split content letters to array
        for (var obj in content[i]) {
            if (typeof content[i][obj] === "string") {
                content[i][obj] = content[i][obj].split("");
            } else if (typeof content[i][obj] === "object") {
                var toPush = [];
                for (var j = 0; j < content[i][obj].length; j++) {
                    for (var k = 0; k < content[i][obj][j].length; k++) {
                        toPush.push(content[i][obj][j][k]);
                    }
                }
                content[i][obj] = toPush;
            }
        }
        // Set text to mutable and position-data
        $("#segments").append("<div class=\"letters-wrap mutable\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
        $("#segments").append("<div class=\"letters-wrap position-data\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
    }

    // Initial arrangement
    arrangeCurrentPage();
    scrambleOthers();

    /*
     * Event handlers
     */
    $(window).resize(function () {
        arrangeCurrentPage();
        scrambleOthers();
    });

    $("#soup-prev").hide();
    $("#soup-prev").click(function () {
        $("#soup-next").show();
        currentPage--;
        if (currentPage === 0) {
            $("#soup-prev").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
        createLoveAnimation(); // Buat ulang animasi love
    });

    $("#soup-next").click(function () {
        $("#soup-prev").show();
        currentPage++;
        if (currentPage === content.length - 1) {
            $("#soup-next").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
        createLoveAnimation();
    });

    /*
     * Functions
     */
    function arrangeCurrentPage() {
        for (var i = 0; i < content[currentPage].title.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .soup-title > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().top + "px",
                color: "#111",
                zIndex: 9001,
                opacity: 1
            });
        }
        for (var i = 0; i < content[currentPage].desc.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().top + "px",
                color: "#111",
                zIndex: 9001,
                opacity: 1
            });
        }
    }

    function setText() {
        var j;
        for (j = 0; j < content[i].title.length; j++) {
            $(".soup-title").last().append("<span class=\"letter\">" + content[i].title[j] + "</span>");
        }
        for (j = 0; j < content[i].desc.length; j++) {
            $(".soup-desc").last().append("<span class=\"letter\">" + content[i].desc[j] + "</span>");
        }
    }

    function scrambleOthers() {
        for (var i = 0; i < content.length; i++) {
            if (currentPage === i) continue;
            var parts = [
                ["title", ".soup-title"],
                ["desc", ".soup-desc"]
            ];
            for (var j = 0; j < parts.length; j++) {
                for (var k = 0; k < content[i][parts[j][0]].length; k++) {
                    var randLeft = Math.floor(Math.random() * $(window).width());
                    var randTop = Math.floor(Math.random() * $(window).height());
                    $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter").eq(k).css({
                        left: randLeft,
                        top: randTop,
                        color: "#DDD",
                        zIndex: "initial",
                        opacity: 1 // Pastikan huruf tetap terlihat
                    });
                }
            }
        }
    }

    function createLoveAnimation() {
        // Hapus semua love yang ada sebelumnya
        $(".love").remove();

        var colors = ["pink", "blue", "purple", "red"];
        var color = colors[currentPage - 1] || "pink"; // Default to pink if out of range

        // Love merah hanya muncul di slide terakhir
        if (currentPage === content.length - 1) {
            color = "red";
        }

        var love = $("<div class='love " + color + "'></div>");
        $("#soup-container").append(love);

        if (color !== "red") {
            setTimeout(function () {
                love.remove();
            }, 6000); // Remove after 6 seconds (kecuali merah)
        }
    }
});