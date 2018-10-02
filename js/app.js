new Vue({
    el: '#app',
    data: {
        gameStart: false,
        isLog: false,
        meHealt: 100,
        monsterHealt: 100,
        score: [0,0],
        specialAttack: 1,
        healtRight: 1,
        logs: [],
    },
    methods:{
        startNewGame: function(){
            this.gameStart = true;
            this.meHealt = 100;
            this.monsterHealt = 100;
            this.isLog = false;
            this.specialAttack = 1;
            this.healtRight = 1;
            this.logs = [];
        },
        giveUp: function(){
            this.score[1]++;
            this.meHealt = 10;
            var select = confirm("Yarışmadan Çekildiniz. Yeni Oyun Başlatmak İster misiniz ?");
            if(select == true){
                this.startNewGame();
            }
        },
        attack: function(attackType){
            if(attackType == 'special'){
                if(this.specialAttack > 0){
                    this.specialAttack--;
                    var meAttack = Math.floor((Math.random() * 30) + 1);
                    this.add_new_log({ turn: 'player', text: 'Özel Saldırı Yaptınız ( '+meAttack+' )'});
                }else{
                    alert("Özel Saldırı Her Oyun İçin 1 Kere Kullanılabilir, Normal Saldırı Yapıldı");
                    var meAttack = Math.floor((Math.random() * 10) + 1);
                    this.add_new_log({ turn: 'player', text: 'Saldırı Yaptınız ( '+meAttack+' )'});
                }
            }else{
                var meAttack = Math.floor((Math.random() * 10) + 1);
                this.add_new_log({ turn: 'player', text: 'Saldırı Yaptınız ( '+meAttack+' )'});
            }
            
            var monsterAttack = Math.floor((Math.random() * 10) + 1);
            var select;
            this.meHealt -= monsterAttack;
            this.monsterHealt -= meAttack;
            this.add_new_log({ turn: 'monster', text: 'Canavar Saldırı Yaptı ( '+monsterAttack+' )'});
            if(this.meHealt <= 0){
                this.meHealt = 0;
            }
            if(this.monsterHealt <= 0){
                this.monsterHealt = 0;
            }
            if(this.meHealt <= 0 && this.monsterHealt <= 0){
                select = confirm("Yarışma Berabere Bitti, Yeniden Oynamak İster misiniz ?");
            }else if(this.meHealt <= 0){
                this.score[1]++; 
                select = confirm("Yarışmayı Kaybettiniz. Yeniden Oynamak İster misiniz ?");
            }else if(this.monsterHealt <= 0){
                this.score[0]++;
                select = confirm("Yarışmayı Kazandınız. Yeniden Oynamak İster misiniz ?");
            }
            if(select == true){
                this.startNewGame();
            }
        },
        help: function(){
            if(this.healtRight > 0){
                var help = Math.floor((Math.random() * 30) + 1);
                this.meHealt += help;
                if(this.meHealt > 100){
                    this.meHealt = 100;
                }
                this.healtRight--;
                this.add_new_log({ turn: 'player', text: 'Yardım Aldınız ( +'+help+' )'});
            }else{
                alert("Yardım Her Oyunda Sadece 1 Kere Kullanılabilir.");
            }
        },
        add_new_log: function(log){
            this.logs.push(log);
        }
    },
    watch: {
        meHealt: function(now,old){
            
            var damage = old - now;
            this.isLog = true;
        },
        monsterHealt: function(now,old){
            var damage = old - now;
            this.isLog = true;
        },
    }
});