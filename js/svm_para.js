(function(){
		
/*
 * lyt
 * 
 * 2016/1/20
 */
	
	//constructor
	//svc……0,1,2,3,4
	function SVM(sv,svc,coef,inter,ke){
		//private member
		//matrix			
		var _support_vecter=sv;
		//array
		var _support_vecter_classes=svc;
		//n*m matrix
		var _coefficient=coef;
		//array
		var _intercept=inter;		
		var _kernnel_fun=ke||function(){};		
		var classes_number=_unique(_support_vecter_classes).length;
		var decision_func_length=classes_number*(classes_number-1)/2;
		var classes_matrix=_backtrace_combine(classes_number);
		/*private method
		 */
		//decision=[-1,1,1,1,-1]
		// return [0,0,1,2,0]
		function _vote_for_class(decision){
			var ans=[];
			for(var i=0;i<decision.length;i++){
				var _xvsx_=classes_matrix[i];
				if(decision[i]===1){
					//vote for first
					ans.push(_xvsx_[0]);
				}
				else{
					//vote for second
					ans.push(_xvsx_[1]);
				}
			}
			return ans;
		}
		//classes=[0,0,1,2,0]
		//return 0
		function find_the_most_one(classes){
			var ob={};
			for(var i=0;i<classes.length;i++){
				var ii=classes[i];
				if(ob[ii]===undefined){
					ob[ii]=1;
				}
				else{
					ob[ii]++;
				}
			}
			var max=-1;
			var class_max=0;
			for(var key in ob){
				if(ob[key]>max){max=ob[key];class_max=key}
			}
			return class_max;
		}
		//public method
		this.predict=function(X){
			var ans=[];
			var decision_array=this.decision_function(X);			
			for(var i=0;i<decision_array.length;i++){
				ans.push(_sgn(decision_array[i]));
			}
			return find_the_most_one(_vote_for_class(ans));			
		}
		this.decision_function=function(x){
			var decision_func=[];		
			//0vs1 0vs2…………0vsn,1vs0,…………,n-1vsn
			for(var i=0;i<decision_func_length;i++){
				var _xvsx_=classes_matrix[i];
				//0…………0vs1
				//1…………0vs2
				//2…………0vs3
				//…………
				var first_class_arry=_classes_(_support_vecter_classes,_xvsx_[0]);
				var row_number=__get_row_in_coef(_xvsx_[0],_xvsx_[1],classes_number);
				var fisrt_sum=0;
				for(var k=0;k<first_class_arry.length;k++){
					fisrt_sum+=(_coefficient[row_number][first_class_arry[k]]*_kernnel_fun(x,_support_vecter[first_class_arry[k]]));
				}
				var second_class_arry=_classes_(_support_vecter_classes,_xvsx_[1]);
				var row_number=__get_row_in_coef(_xvsx_[1],_xvsx_[0],classes_number);
				var second_sum=0;
				for(var k=0;k<second_class_arry.length;k++){
					second_sum+=(_coefficient[row_number][second_class_arry[k]]*_kernnel_fun(x,_support_vecter[second_class_arry[k]]));
				}							
				decision_func.push(_intercept[i]+fisrt_sum+second_sum);
			}			
			return decision_func;
		};

	}
	
	function __get_row_in_coef(first,second,total_classes){
		var generator_class=[];
		var flag=false;
		//iterator class_number_1 rows
		for(var i=0;i<total_classes-1;i++){
			if(i===first){generator_class.push(first+1);flag=true}
			else{
				if(!flag)
				generator_class.push(i)
				else
				generator_class.push(generator_class[generator_class.length-1]+1);
				
			}
		}
		for(var j=0;j<generator_class.length;j++){
			if(generator_class[j]===second)return j;
		}
	}
				//0…………0vs1
				//1…………0vs2
				//2…………0vs3
				//3…………1vs2
				//4…………1vs3
				//5…………2vs3
	function _backtrace_combine(total_classes){
			var temp=[];
			var result=[];
			__backtrace_combine(total_classes,0,result,temp);
			return result;
	}
	function __backtrace_combine(total_classes,ii,result,temp){		
		if(temp.length==2){
			result.push(temp.slice(0,2));
			return;
		}
		if(ii==total_classes)return;
		for(var i=ii;i<total_classes;i++){
			temp.push(i)
			__backtrace_combine(total_classes,i+1,result,temp);
			temp.pop();
		}
	}
	function _get_index_of_verse(index,total_classes){
		var first=parseInt(index/(total_classes-1));
		var generator_class=[];
		var flag=false;
		for(var i=0;i<total_classes-1;i++){
			if(i===first){generator_class.push(first+1);flag=true}
			else{
				if(!flag)
				generator_class.push(i)
				else
				generator_class.push(generator_class[generator_class.length-1]+1);
		}
		var _temp_index=index%(total_classes-1);
		var second=generator_class[_temp_index];
		return{
			first:first,
			second:second			
		}
		}
	}
	function _unique(arry){
		var temp;		
		var temp_arr=arry.sort();
		if(temp_arr.length===0)return;
		var ans=[];
		ans.push(temp_arr[0]);
		for(var i=1;i<temp_arr.length;i++){
			if(temp_arr[i]!=ans[ans.length-1])
			ans.push(temp_arr[i])
		}
		return ans;
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
	
	window.SVM=SVM;
})()
