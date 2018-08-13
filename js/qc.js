var winW, winH;
var vdSupp = true;
$(function() {
	winW = document.documentElement.clientWidth || document.body.clientWidth;
	winH = document.documentElement.clientHeight || document.body.clientHeight;
	document.body.style.width = winW + "px";
	document.body.style.height = winH + "px";
	var curCount = 0,
		startY = 0,
		endY = 0,
		diffY = 0,
		dTime = 500,
		norZidx = "10",
		curZidx = "20",
		totZidx = "30",
		isMove = false,
		isUp = false,
		isDown = false;
	var illi = $(".itemlist li");
	var totCount = illi.length;
	$(document).bind("touchstart", function(e) {
		e.stopPropagation();
		startY = endY = parseInt(e.touches[0].clientY)
	});
	$(document).bind("touchmove", function(e) {
		e.stopPropagation();
		e.preventDefault();
		endY = parseInt(e.touches[0].clientY);
		diffY = parseInt(endY - startY);
		if (curCount == 0) {
			if (diffY < -10) {
				if (!isDown) {
					isUp = true
				}
			}
		} else if (curCount == totCount - 1) {
			if (diffY > 10) {
				if (!isUp) {
					isDown = true
				}
			}
		} else if (curCount > 0 && curCount < totCount - 1) {
			if (diffY < -10) {
				if (!isDown) {
					isUp = true;
					if (winH + diffY == 0) {
						return
					}
				}
			} else if (diffY > 10) {
				if (!isUp) {
					isDown = true
				}
			}
		}
	});
	$(document).bind("touchend", function(e) {
		e.stopPropagation();
		illi.css({
			"z-index": norZidx,
			"visibility": "hidden"
		});
		$(illi.get(curCount)).css({
			"z-index": curZidx,
			"visibility": "visible"
		});
		var translateY = 0;
		var cur = $(illi.get(curCount));
		if (isUp) {
			var next = $(illi.get(curCount + 1));
			translateY = diffY;
			if (Math.abs(translateY / winH) < 0.9) {
				cur.removeClass("tran0" + (curCount + 1));
				setTimeout(function() {
					next.css({
						"z-index": totZidx,
						"visibility": "visible",
					});
					next.addClass("tran0" + (curCount + 2));
					curCount++
				}, 1000)
			}
			isUp = false;
			isDown = false
		}
		if (isDown) {
			var prev = $(illi.get(curCount - 1));
			translateY = diffY;
			if (Math.abs(translateY / winH) < 0.9) {
				cur.removeClass("tran0" + (curCount + 1));
				setTimeout(function() {
					prev.css({
						"z-index": totZidx,
						"visibility": "visible",
					});
					prev.addClass("tran0" + (curCount));
					curCount--
				}, 1000)
			}
			isUp = false;
			isDown = false
		}
	});
	$(".item01").addClass("tran01");
	$(".musicplay").bind("touchstart", function(e) {
		e.stopPropagation();
		var _0 = $(this);
		try {
			var oMusic = $(".music").get(0)
		} catch (e) {
			alert('抱歉，您的设备不支持audio！');
			return
		}
		if (oMusic.paused) {
			if (_0.hasClass("musicplay")) {
				_0.removeClass("musicplay").addClass("musicpause")
			} else {
				oMusic.play();
				_0.removeClass("musicpause").addClass("musicplay")
			}
		} else {
			oMusic.pause();
			_0.removeClass("musicplay").addClass("musicpause")
		}
	});
	try {
		var vdb = $(".videobox");
		var vd = $(".video");
		var oVideo = vd.get(0)
	} catch (e) {
		vdSupp = false
	}
	$(".videobox").bind("touchend", function(e) {
		if (!vdSupp) {
			alert('抱歉，您的设备不支持video！');
			return
		}
		if (isMove) {
			isMove = false;
			return
		}
		if (oVideo.paused) {
			vdb.css({
				"background-color": "#000"
			});
			vd.css({
				"display": "block"
			});
			oVideo.play()
		} else {
			oVideo.pause();
			vd.css({
				"display": "none"
			});
			vdb.css({
				"background-color": "transparent"
			})
		}
	});
	var transend = "webkitTransitionEnd MSTransitionEnd oTransitionEnd TransitionEnd";
	$(".item01,.item02,.item03,.item04,.item05,.item06,.item07,.item08,.item10").bind(transend, function() {
		if (!vdSupp) {
			return
		}
		if (oVideo.ended || oVideo.paused) {
			vd.css({
				"display": "none"
			});
			vdb.css({
				"background-color": "transparent"
			});
			return
		}
		oVideo.pause();
		vd.css({
			"display": "none"
		});
		vdb.css({
			"background-color": "transparent"
		})
	});
	$(".poplayer").bind("touchstart touchmove touchend", function(e) {
		e.stopPropagation()
	});
	$(".item04 .tit05").bind("touchend", function(e) {
		e.stopPropagation();
		$(".item04").addClass("mask04");
		$(".poplayer").show();
		setTimeout(function() {
			$(".poplayer .tit01").addClass("pop01")
		}, 0)
	});
	$(".poplayer .tit01 .close").bind("touchend", function(e) {
		e.stopPropagation();
		$(".item04").removeClass("mask04");
		$(".poplayer .tit01").removeClass("pop01");
		setTimeout(function() {
			$(".poplayer").hide()
		}, 1500)
	});
	$(".t1, .t2").bind("touchend", function() {
		var num = $(this).text().replace(/\D/g, "");
		location.href = "tel:" + num
	})
});
$(function() {
	var curC3slide = $(".itemlist .item07 .tit01 dl");
	var curC3slideItem = curC3slide.find("dd");
	var itemNum = curC3slideItem.length;
	var slideItemWidth = winW;
	var slideMoveDist = translateX = 0;
	var startX = endX = startY = endY = iCount = 0;
	var isMoveX = false;
	var dTime = 200;
	curC3slide.css({
		"width": (itemNum * 100) + "%",
		"height": curC3slideItem.get(0).clientHeight + "px",
		"-webkit-transition-delay": "0ms",
		"-webkit-transition-timing-function": "ease-in-out",
		"-webkit-transform": "translate3d(0,0,0)"
	});
	curC3slideItem.css({
		"width": (100 / itemNum) + "%"
	});
	$(".pageleft").hide();
	curC3slide.get(0).addEventListener("touchstart", function(e) {
		startX = endX = parseInt(e.touches[0].pageX);
		startY = endY = parseInt(e.touches[0].clientY);
		translateX = parseInt(curC3slide.css("-webkit-transform").split(/[(]|[,]|[)]/)[1])
	}, false);
	curC3slide.get(0).addEventListener("touchmove", function(e) {
		endX = parseInt(e.touches[0].pageX);
		endY = parseInt(e.touches[0].clientY);
		var diffX = parseInt(endX - startX);
		var diffY = parseInt(endY - startY);
		if (Math.abs(diffX) > Math.abs(diffY)) {
			isMoveX = true;
			e.preventDefault();
			e.stopPropagation();
			curC3slide.css({
				"-webkit-transition-duration": "0ms",
				"-webkit-transform": "translate3d(" + (translateX + diffX) + "px,0,0)"
			})
		}
	}, false);
	curC3slide.get(0).addEventListener("touchend", function(e) {
		if (isMoveX) {
			e.stopPropagation();
			if (startX - endX > 10) {
				moveLeft()
			} else if (startX - endX < -10) {
				moveRight()
			} else {
				curC3slide.css({
					"-webkit-transition-duration": "0ms",
					"-webkit-transform": "translate3d(" + -(slideItemWidth * iCount) + "px,0,0)"
				})
			}
		}
		isMoveX = false;
		if (itemNum - 1 == 0) {
			$(".pageleft").hide();
			$(".pageright").hide()
		} else {
			if (iCount == 0) {
				$(".pageright").show();
				$(".pageleft").hide()
			} else if (iCount == itemNum - 1) {
				$(".pageright").hide();
				$(".pageleft").show()
			} else if (iCount > 0 && iCount < itemNum - 1) {
				$(".pageleft").show();
				$(".pageright").show()
			}
		}
	}, false);

	function moveLeft() {
		if (iCount < itemNum - 1) {
			iCount++;
			itemChange(iCount)
		} else {
			curC3slide.css({
				"-webkit-transition-duration": "0ms",
				"-webkit-transform": "translate3d(" + -(slideItemWidth * iCount) + "px,0,0)"
			})
		}
	}
	function moveRight() {
		if (iCount > 0) {
			iCount--;
			itemChange(iCount)
		} else {
			curC3slide.css({
				"-webkit-transition-duration": "0ms",
				"-webkit-transform": "translate3d(" + -(slideItemWidth * iCount) + "px,0,0)"
			})
		}
	}
	function itemChange(c1) {
		var mBegin = -(slideItemWidth * (c1 - 1));
		var mEnd = -(slideItemWidth * c1);
		if (mBegin != mEnd) {
			if (mBegin > mEnd) {
				curC3slide.css({
					"-webkit-transition-duration": dTime + "ms",
					"-webkit-transform": "translate3d(" + mEnd + "px,0,0)"
				})
			} else {
				curC3slide.css({
					"-webkit-transition-duration": dTime + "ms",
					"-webkit-transform": "translate3d(" + mEnd + "px,0,0)"
				})
			}
		}
	}
	$(".itemlist .item07 .tit01 dd img").bind("touchend", function(e) {
		if (isMoveX) {
			return
		}
		if (!$(this).hasClass("full")) {
			$(this).addClass("full")

		} else {
			$(this).removeClass("full")
		}
	})
});