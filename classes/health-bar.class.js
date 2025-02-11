class Healthbar extends DrawableObject {
    STATUSBAR_HEALTH_IMAGE = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    percantege = 100;
    type;
    
    constructor() {
        super();
        this.loadImages(this.STATUSBAR_HEALTH_IMAGE);
        this.x = 20;
        this.y = 20;
        this.width = 120;
        this.height = 40;
        this.setPercentage(100);
    }
    
    // setPercentage(50 (LEBENSANZEIGE))
    setPercentage(percantege) {
        this.percantege = percantege; // => 0 - - - 50 - - - 100
        let path = this.STATUSBAR_HEALTH_IMAGE[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    resolveImageIndex() {
        if (this.percantege == 100) {
            return 5;
        } else if (this.percantege >= 80) {
            return 4;
        } else if (this.percantege >= 60) {
            return 3;
        } else if (this.percantege >= 40) {
            return 2;
        } else if (this.percantege >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
