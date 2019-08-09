(function () {
    var showAlert = window.showAlert = function (params) {
        this.screenAlert=null;
        this.text=params.text
        this.dom = document.querySelector(params.dom);
        var self = this;

        self.screenAlert = createElement("div","screen_alert");
        var error = createElement("i","error")
        var content = createElement("div","screen_alert_content");
        var close = createElement("i","close");
        content.innerHTML = self.text;
        self.screenAlert.appendChild(error);
        self.screenAlert.appendChild(content);
        self.screenAlert.appendChild(close);
        self.dom.appendChild(self.screenAlert);
        self.screenAlert.classList.add("animated","fadeInRight");


        setTimeout(function(){
            closeTk();
        },5000)

        close.onclick = function(){
            closeTk();
        }

        function createElement (tagName, className) {
            var elment = document.createElement(tagName)
            elment.className = className
            return elment
        }

        function closeTk(){
            self.screenAlert.classList.add("fadeOut");
            setTimeout(function(){
                self.screenAlert.remove();
            },700)
        }
    }

})();