	function GetTheClockWiseGesture(frame)
	{
		
		//enable gesture
		var GESTURETYPE="circle";
		var gestures = frame.gestures;
		for (var g = 0; g < gestures.length; ++g)
		{
			var ges = gestures[g];
			if (ges.type === GESTURETYPE)
			{
				var circle = ges
				if(circle.pointableIds)
				{
					var pointable=circle.pointableIds[0];
					var direction = frame.pointable(pointable).direction;
					var dotProduct = Leap.vec3.dot(direction, circle.normal);
					
					if (dotProduct  >  0) return true;
					return false;
				}			
			}          
		}
		return undefined;	
	}