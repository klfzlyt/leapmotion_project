	GestureState GetTheClockWiseGesture(Leap.Frame frame)
	{
		
		GestureList gestures = frame.Gestures();
		for (int g = 0; g < gestures.Count; ++g)
		{
			Gesture ges = gestures[g];
			if (ges.Type == Gesture.GestureType.TYPECIRCLE)
			{
				Leap.CircleGesture circle = new Leap.CircleGesture(ges);
				if (circle.IsValid)
				{
					if(circle.Pointable.Direction.AngleTo(circle.Normal)<=Math.PI/2)
					{
						return GestureState.ClockWise;
					}
					else
					{
						return GestureState.CounterClockWise;
					}
				}				
			}          
		}
		return GestureState.Normal;	
	}