function circle(radius, name)
{
	this.radius=radius;
	this.name=name;
	
	this.setRadius=setRadius;
}
function setRadius(newRadius)
{
	
	this.radius = newRadius;
	
	
}


function CSpace()
	{
		this.x = 0; this.y = 0; this.sqId = 0; this.number = 0; this.availables = 0;	
		this.could_be = new Array(10);//[false, false, false, false, false, false, false, false, false, false];
		for(z = 0; z < 10; z++)
			this.could_be[z] = false;
	
		this.getX = getX;
		this.getY = getY;
		this.getSquare = getSquare;
		this.getNum = getNum;
		this.getAvailableCount = getAvailableCount;
		this.getPossible = getPossible;
		this.setX = setX;
		this.setY = setY;
		this.setSquare = setSquare;
		this.setNum = setNum;
		this.setAvailableCount = setAvailableCount;
		this.setPossible = setPossible;
		
	}
	
					
	function getX()
	{
		return this.x;
	}
	
	function getY()
	{
		return this.y;
	}
	
	function getSquare()
	{
		return this.sqId;
	}
	
	function getNum()
	{
		return this.number;
	}
	
	function getAvailableCount()
	{
		return this.availables;
	}
	
	function getPossible(num)
	{
		return this.could_be[num];
	}
	
						
	function setX(newX)
	{
		this.x = newX;
	}
	
	function setY(newY)
	{
		this.y = newY;
	}
	
	function setSquare(newSqId)
	{
		this.sqId = newSqId;
	}
	
	function setNum(newNum)
	{
		this.number = newNum;
	}
	
	function setAvailableCount(newAvail)
	{
		this.availables = newAvail;
	}
	
	function setPossible(num, state)
	{
		this.could_be[num] = state;
	}
	
	
	function CBoard()
	{
		this.spaces = new Array(81);
		for(c = 0; c < 81; c++)
			this.spaces[c] = new CSpace();
			
		for(c = 0; c < 9; c++)
			for(i = 0; i < 9; i++)
			{
				spaceId = c * 9 + i;
				
				this.spaces[spaceId].setNum(0);
				
				for(k = 1; k < 10; k++)
					this.spaces[spaceId].setPossible(k, true);
				
				this.spaces[spaceId].setX(c);
				this.spaces[spaceId].setY(i);
				
					this.spaces[spaceId].setSquare(3);
				if(i < 6)
					this.spaces[spaceId].setSquare(2);
				if(i < 3)
					this.spaces[spaceId].setSquare(1);
				
				if(c > 2)
					this.spaces[spaceId].setSquare(this.spaces[spaceId].getSquare() + 3);
				if(c > 5)
					this.spaces[spaceId].setSquare(this.spaces[spaceId].getSquare() + 3);
			}
		
		this.solved = false; this.stuck = false; this.impossible = false; this.count = 0;
		this.assignNum= assignNum
		this.getCount= getCount
		this.isStuck= isStuck
		this.isSolved =isSolved
		this.isImpossible= isImpossible
		this.availability_check= availability_check
		this.checkSolvedOrStuck= checkSolvedOrStuck
		this.easysolves= easysolves
		this.equals= equals
		this.guess =guess
		this.impossibility_check= impossibility_check
		this.read = read;
		this.print = print;
	}
	
	function print()
	{
		for(d = 0; d < 81; d++)
			if(this.spaces[d].getNum() != 0)
				document.getElementById("i"+(d+1)).value = this.spaces[d].getNum();
			else
				document.getElementById("i"+(d+1)).value = "";
	}
	
	function read()
	{
		for(f = 0; f < 81; f++)
			this.assignNum(f,document.getElementById("i"+(f+1)).value);
	
	}
	
	function assignNum(space, num)
	{
		this.spaces[space].setNum(num);
	}
	
	function getCount() {
		return this.count;
	}

	function isStuck() {
		return this.stuck;
	}

	function isSolved() {
		return this.solved;
	}
	
	function isImpossible() {
		return this.impossible;
	}

	function availability_check()
	{
		for(c = 0; c < 81; c++)
		{
			if(this.spaces[c].getNum() != 0)
				for(i = 0; i < 10; i++)
					this.spaces[c].setPossible(i, false);
			for(i = 0; i < 81; i++)
			{
				if(c == i)
					continue;
				if( (this.spaces[c].getX() == this.spaces[i].getX() || this.spaces[c].getY() == this.spaces[i].getY() || this.spaces[c].getSquare() == this.spaces[i].getSquare()) && this.spaces[i].getNum() != 0 && c != i)
					this.spaces[c].setPossible(this.spaces[i].getNum(), false);
			}
			if(this.spaces[c].getNum() == 0)
			{
				this.spaces[c].setAvailableCount(0);
				for(k = 1; k < 10; k++)
					if(this.spaces[c].getPossible(k))
						this.spaces[c].setAvailableCount(this.spaces[c].getAvailableCount() + 1);
			}
		}
	}

	function checkSolvedOrStuck()
	{
		tcount = 0;
		this.solved = true;
		for(c = 0; c < 81; c++)
		{
			if(this.spaces[c].getNum() == 0)
				this.solved = false;
			else
				tcount ++;
		}
		if(tcount == this.count)
			this.stuck = true;
		this.count = tcount;
	}

	function easysolves()
	{
		first_available = 0, second_available = 0;

		for(var c = 0; c < 81; c++)
		{
			available_count = 0;
			for(k = 1; k < 10; k++)
				if(this.spaces[c].getPossible(k) == true)
				{
					available_count += 1;
					if(available_count == 1)
						first_available = k;
					if(available_count == 2)
						second_available = k;
				}


			if(available_count == 1)
				for(k = 1; k < 10; k++)
					if(this.spaces[c].getPossible(k) == true)
					{
						this.spaces[c].setNum(k);
						this.availability_check();
					}

			if(available_count == 2)
			{
				for(i = 0; i < 81; i++)
				{
					if(i == c)
						continue;

					if(this.spaces[i].getAvailableCount() == 2 && this.spaces[i].getPossible(first_available) && this.spaces[i].getPossible(second_available))
					{
						if(this.spaces[i].getX() == this.spaces[c].getX())
							for(k = 0; k < 81; k++)
							{
								if(k == i || k == c)
									continue;
								if(this.spaces[k].getX() == this.spaces[c].getX())
								{
									this.spaces[k].setPossible(first_available, false);
									this.spaces[k].setPossible(second_available, false);
								}
							}
						if(this.spaces[i].getY() == this.spaces[c].getY())
							for(k = 0; k < 81; k++)
							{
								if(k == i || k == c)
									continue;
								if(this.spaces[k].getY() == this.spaces[c].getY())
								{
									this.spaces[k].setPossible(first_available, false);
									this.spaces[k].setPossible(second_available, false);
								}
							}
						if(this.spaces[i].getSquare() == this.spaces[c].getSquare())
							for(k = 0; k < 81; k++)
							{
								if(k == i || k == c)
									continue;
								if(this.spaces[k].getSquare() == this.spaces[c].getSquare())
								{
									this.spaces[k].setPossible(first_available,  false);
									this.spaces[k].setPossible(second_available,  false);
								}
							}
						
					}
				}	
			}

			if(this.spaces[c].getNum() == 0)
				for(k = 1; k < 10; k++)
				{
					if(this.spaces[c].getPossible(k) == true)
					{
						oneleftX = true;
						oneleftY = true;
						oneleftSq = true;
						for(i = 0; i < 81; i++)
						{
							if(i == c)
								continue;
							if(this.spaces[i].getX() == this.spaces[c].getX() && this.spaces[i].getPossible(k) == true)
								oneleftX = false;
							if(this.spaces[i].getY() == this.spaces[c].getY() && this.spaces[i].getPossible(k) == true)
								oneleftY = false;
							if(this.spaces[i].getSquare() == this.spaces[c].getSquare() && this.spaces[i].getPossible(k) == true)
								oneleftSq = false;
						}
						if(oneleftX || oneleftY || oneleftSq)
						{
							this.spaces[c].setNum(k);
							this.availability_check();
						}
					}
				}
			
		}
	}
	
	function equals(right)
	{
		for(c = 0; c < 81; c++)
		{
			this.spaces[c].setNum(right.spaces[c].getNum());
			this.spaces[c].setAvailableCount(right.spaces[c].getAvailableCount());
			this.spaces[c].setSquare(right.spaces[c].getSquare());
			this.spaces[c].setX(right.spaces[c].getX());
			this.spaces[c].setY(right.spaces[c].getY());
			for(i = 1; i < 10; i++)
			{
				this.spaces[c].setPossible(i, right.spaces[c].getPossible(i));
			}
		}
	}
	
	function guess()
	{
		guess1 = Math.floor(Math.random()*81);
		while(this.spaces[guess1].getNum() != 0)
			guess1 = Math.floor(Math.random()*81);

		guess2 = Math.floor(Math.random()*9)+1;
		while(this.spaces[guess1].getPossible(guess2) == false)
			guess2 = Math.floor(Math.random()*9)+1;

		this.spaces[guess1].setNum(guess2);
	}
	
	function impossibility_check()
	{
		for(c = 0; c < 81; c++)
		{
			zcount = 0;
			if(this.spaces[c].getNum() == 0)
			{
				for(i = 1; i < 10; i++)
					if(this.spaces[c].getPossible(i))
						zcount ++;
				if(zcount == 0)
					this.impossible = true;
			}
		}
	}
	
function solve(puzzle){
	guessing = new CBoard();
	puzzle.print();

	while(!puzzle.isSolved() && !puzzle.isStuck())
	{
		puzzle.availability_check();
		puzzle.easysolves();
		
		puzzle.checkSolvedOrStuck();
		puzzle.impossibility_check();
		if(puzzle.isImpossible()){
			document.getElementById("first").innerHTML=("this is impossible");
			return 0;
		}
		//PRINT(puzzle);
	
		//cin >> i;
	}
	if(puzzle.isStuck())
	{
		resetCount = 0;
		//count = 0;
		guessing.equals(puzzle);
		guessing.guess();
		//cout << "guessing...\n";
		while(!guessing.isSolved())
		{
			guessing.availability_check();
			guessing.easysolves();
			guessing.checkSolvedOrStuck();
			guessing.impossibility_check();
			
			if(guessing.isImpossible())
			{
				resetCount += 1;
				guessing.equals(puzzle);
				guessing.guess();
			}
			
			if(guessing.isStuck())
				guessing.guess();
			if(resetCount > 50){
				document.getElementById("first").innerHTML=("I can't seem to solve this");
				return 0;
			}
		}
	//cout << "\n\n";
	}
	if(puzzle.isSolved())
		puzzle.print();
	if(guessing.isSolved()){
		guessing.print();
		puzzle.equals(guessing);
	}
	document.getElementById("first").innerHTML=("Solved!");
	//cin >> i;
	
}
	
function setUp()
{
	katze = new CBoard();
	brot = false;
	while(!brot){
		katze.checkSolvedOrStuck();
		for(var g = 0; g < 25; g++){
			katze.guess();
			katze.availability_check();
			//katze.easysolves();
			katze.checkSolvedOrStuck();
			katze.impossibility_check();
		}
			brot = true;
	}
	katze.print();
}
	
function main()
{
	bob = new CBoard();	
	bob.read();
	solve(bob);
	//document.getElementById("first").innerHTML=(bob.getCount());
	//fred.setRadius(document.getElementById("i0").value);
	//document.getElementById("first").innerHTML=(fred.radius + " this is gaaaayyy\n");
}