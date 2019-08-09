(function () {
    var imgArr = {
        "images": [{
            "name": "img0",
            "url": "/images/screen/0.png"
        }, {
            "name": "img1",
            "url": "/images/screen/1.png"
        }, {
            "name": "img2",
            "url": "/images/screen/2.png"
        }, {
            "name": "img3",
            "url": "/images/screen/3.png"
        }, {
            "name": "img4",
            "url": "/images/screen/4.png"
        }, {
            "name": "img5",
            "url": "/images/screen/5.png"
        }, {
            "name": "img6",
            "url": "/images/screen/6.png"
        }, {
            "name": "img7",
            "url": "/images/screen/7.png"
        }, {
            "name": "img8",
            "url": "/images/screen/8.png"
        }, {
            "name": "img9",
            "url": "/images/screen/9.png"
        }]
    }
    var PeopleNumber = window.PeopleNumber = function (params) {
        this.data = 0;
        this.basedata = 0;
        this.animationType = false;
        this.basedom = document.querySelector(params.dom);
        this.numberWrap = null;
        var self = this;

        self.numberWrap = createElement("div", "join_number_wrap");
        self.basedom.appendChild(self.numberWrap);

        this.loadAllResource(function () {
            self.update(0);
        });

    }
   
    PeopleNumber.prototype.update = function (_data) {
        var self = this;
        self.data = _data;
        self.numberWrap.innerHTML = "";
        if (_data && isNumber(_data)) {
            var num = _data.toString();
            var numArr = String(num).split('');
            numArr.forEach(function (item) {
                var img = self.R[`img${item}`].cloneNode(true);
                self.numberWrap.appendChild(img);
            })
        } else {
            self.numberWrap.appendChild(self.R.img0);
        }
        setTimeout(function () {
            self.startAnimation();
        }, 50)
    }

    PeopleNumber.prototype.startAnimation = function () {
        var self = this;
        if(!self.animationType){
            self.animationType = true;
            self.numberWrap.classList.add("animated", "bounceIn");
            setTimeout(function () {
                self.numberWrap.classList.remove("animated", "bounceIn");
                self.animationType = false;
            }, 700)
        }
    }

    function createElement(tagName, className) {
        var elment = document.createElement(tagName)
        elment.className = className
        return elment
    }

    function isNumber(obj) {
        return typeof obj === 'number' && !isNaN(obj)
    }
    // 加载图片
    PeopleNumber.prototype.loadAllResource = function (callback) {
        this.R = {};
        var self = this;
        var alreadyLoadNumber = 0;
        // 遍历图片资源数组
        for (var i = 0; i < imgArr.images.length; i++) {
            self.R[imgArr.images[i].name] = new Image();
            self.R[imgArr.images[i].name].src = imgArr.images[i].url;
            self.R[imgArr.images[i].name].onload = function () {
                alreadyLoadNumber++;
                // 当所有图片加载完成时
                if (alreadyLoadNumber == imgArr.images.length) {
                    callback();
                }
            }
        }
    }

})();