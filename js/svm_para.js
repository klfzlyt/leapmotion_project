(function(){
		

	
	//constructor
	function SVM(sv,svc,coef,inter,ke){
		//matrix	
		var _support_vecter=[];
		//array
		var _support_vecter_classes=[];
		//n*m matrix
		var _coefficient=[]
		//array
		var _intercept=[];
		
		var _kernnel_fun=ke||function(){};
		
		_support_vecter=sv;
		_support_vecter_classes=svc;	
		_coefficient=coef;
		_intercept=inter;
		
		
		this.sgn=sgn;
		this.predict=function(x){
			var decision_func=[];
			//0vs1 0vs2…………0vsn,1vs0,…………n-1vsn
			
			
		};
	}
		
	function _sgn(x){
		if(x>=0)return 1;
		if(x<0)return -1;
	}
	//index_of_decision_func
	//0…………0vs1  1…………0vs2 2…………0vs3 3…………1vs0  
	//total_classes is the number of classes
	//return the row number of the intented index
	function _get_parameter(index_of_decision_func,total_classes){
		return index_of_decision_func%(total_classes-1);
	}
	//get index of classes
	//index is 0,1,2,3,4,5
	//return index of array in classes_ 
	function _classes_(classes,index){		
		var ans=[];
		var classes_sorted=classes.sort();
		for(var i=0;i<classes_sorted.length;i++){
			if(classes_sorted[i]==index)
			ans.push(i);
		}
		return ans;
	}
})()
