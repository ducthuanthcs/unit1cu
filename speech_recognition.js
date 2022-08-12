$(function () {
    $.getScript("/assets/global/plugins/artyom.min.js", function (data, textStatus, jqxhr) {
        const artyom = new Artyom();
        var command = {};
        // This function activates artyom and will listen and execute only 1 command (for http connections)
        function startOneCommandArtyom(command) {
            artyom.fatality();// use this to stop any of

            setTimeout(function () {// if you use artyom.fatality , wait 250 ms to initialize again.
                artyom.initialize({
                    lang: "en-GB",// A lot of languages are supported. Read the docs !
                    continuous: true,// recognize 1 command and stop listening !
                    listen: true, // Start recognizing
                    debug: true, // Show everything in the console
                    speed: 1 // talk normally
                }).then(function () {
                    console.log("Ready to work !");
                    $("#krr_arscore").hide();
                    $(".audio-wave").show();
                    $("#krr_success").hide();
                    $("#krrt_text").text("");
                    $("#krrt_ins").hide();
                    $("#krr_verline").hide();
                    $("#kr_arbutton").hide();
                    $("#kr_tresult").hide();
                    mediaRecorder.start();
                });
            }, 250);
            artyom.addCommands(command);
        }
        artyom.redirectRecognizedTextOutput(function (recognized, isFinal) {
            if (isFinal) {
                // $("#krrt_text").text(recognized);
                //$("#output").text("");
                $("#krrt_text").append('<mark>' + recognized + '</mark>');
                tries = tries + 1;
            } else {

            }
        });

        function stopArtyom() {
            artyom.fatality();
            if (mediaRecorder.state !="inactive")
            mediaRecorder.stop();
            $("#kr_tresult").hide();
        }
        var tries = 0;
        var isStart = false;
        $(document).keypress(function (e) {
            if ((e.which == 13) && (isStart)) {
                startOneCommandArtyom(command);
            }
        });
        $(document).on("click", "#kr_bclose", function () {
            $("#kr_arrecord").hide();
            $("#kr_tresult").hide();
            $("#krrt_text").html("");
            $("#krr_success").hide();
            $(".audio-wave").show();
            stopArtyom();
            isStart = false;
        });
        $(document).on("click", ".recording_user", function () {
            var left = $(this).offset().left - $('.exercise-content').offset().left;
            var top = $(this).offset().top - $('.exercise-content').offset().top;
            left = left - $("#kr_arrecord").width() / 2 + $(this).width() / 2;
            top = top + $(this).height() + 10;
            $("#kr_arrecord").css({ "display": "block", "top": top + "px", "left": left + "px" });
            tries = -1;
            //var val = $(this).siblings(".exercise-card-name").text();
            var val = $(this).attr("result");
            if ((val == '') || (val == null)) {
                val=$(this).siblings('.bs_ta').text();
            }
            val = val.replace(/\.+$/, "");
            val = val.replace(/\?+$/, "");
            val = val.replace(/\!+$/, "");
            val = val.replace(/-/g, " ");
            
            artyom.emptyCommands();
            command =
                {
                    indexes: [val],
                    action: function () {
                        stopArtyom();
                        var str = '';
                        if (tries === 0) {
                            $("#krrs_number").text('100%');
                            $("#kr_tresult").text('Trời ơi giỏi quá, chính xác luôn!')
                        }
                        else {
                            $("#krrs_number").text((10 - tries) * 10 + '%');
                            $("#kr_tresult").text('Bạn làm rất tốt, lần sau cố đạt 100% nhé!')
                        }
                        $("#krr_verline").css({ "display": "inline-block" });
                        $("#kr_arbutton").show();
                        $(".audio-wave").hide();
                        $("#krr_success").hide();
                        $("#krr_arscore").show();
                        $("#kr_tresult").show();

                    }
                };
            $("#krr_arscore").hide();
            $("#krr_verline").hide();
            $(".audio-wave").hide();
            $("#krr_success").show();
            $("#krrt_text").text("");
            $("#krrt_ins").show();
            $("#kr_arbutton").hide();
            isStart = true;
        });
        //
        var mediaRecorder = {};
        if (navigator.getUserMedia) {
            navigator.getUserMedia(
                {
                    audio: true
                },
                function (stream) {
                    mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.onstop = function (e) {
                        var blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
                        chunks = [];
                        var audioURL = window.URL.createObjectURL(blob);
                        $("#krb_arspeak").attr("media-url", audioURL);
                    }
                    mediaRecorder.ondataavailable = function (e) {
                        //var audioURL = window.URL.createObjectURL(e.data);
                        //audio.src = audioURL;
                        chunks.push(e.data);
                    }
                },
                // Error callback
                function (err) {
                    console.log('The following gUM error occured: ' + err);
                }
            );
        } else {
            console.log('getUserMedia not supported on your browser!');
        }
        var chunks = [];
        $(document).on("click", "#krb_arspeak", function () {
            let audioURL = $(this).attr("media-url");
            if (audioURL != null) {
                var a = new Audio(audioURL);
                a.onplaying = function () {
                    $("#krbsp_icon").addClass("krbsp_icon_active");
                };
                a.onended = function () {
                    $("#krbsp_icon").removeClass("krbsp_icon_active");
                }
                a.play();
            }
        })
        $(document).on("click", "#krb_arrecord", function () {
            startOneCommandArtyom(command);
        })
    });
    
})

