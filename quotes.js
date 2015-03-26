
function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
} 

$(document).ready(function(){

	console.log("We're in Auto Land");
	
	var quotes = [
		'\"Do. Or do not. There is no try.\" <br><br>- Yoda, Jedi Master.',
		'\"To any entrepreneur: if you want to do it, do it now. If you don’t, you’re going to regret it.\" <br><br>- Catherine Cook, co<br><br>-founder of MyYearbook.',
		'\"It’s not about ideas. It’s about making ideas happen.\" <br><br>- Scott Belsky, co<br><br>-founder of Behance.',
		'\"There’s nothing wrong with staying small. You can do big things with a small team.\" <br><br>- Jason Fried, founder of 37signal.',
		'\"Ideas are easy. Implementation is hard.\" <br><br>- Guy Kawasaki, founder of AllTop.',
		'\"If you just work on stuff that you like and you’re passionate about, you don’t have to have a master plan with how things will play out.\" <br><br>- Mark Zuckerberg, founder of Facebook.',
		'\"The best time to plant a tree was 20 years ago. The second best time is now.\" <br><br>- Chinese proverb.',
		'\"The secret to successful hiring is this: look for the people who want to change the world.\" <br><br>- Marc Benioff, CEO of Salesforce.',
		'\"If you’re not a risk taker, you should get the hell out of business.\" <br><br>- Ray Kroc, founder of McDonald’s.',
		'\"When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.\" Henry Ford, founder of Ford Motor Company.',
		'\"Always deliver more than expected.\" —Larry Page, co<br><br>-founder of Google.',
		'\"You shouldn’t focus on why you can’t do something, which is what most people do. You should focus on why perhaps you can, and be one of the exceptions.\" <br><br>- Steve Case, co<br><br>-founder of AOL.',
		'\"A person who never made a mistake never tried anything new.\" <br><br>- Albert Einstein, physicist.',
		'\"Risk more than others think is safe. Dream more than others think is practical.\" <br><br>- Howard Schultz, CEO of Starbucks.',
		'\"Be undeniably good. No marketing effort or social media buzzword can be a substitute for that.\" <br><br>- Anthony Volodkin, founder of HypeMachine.',
		'\"The way to get started is to quit talking and begin doing.\" <br><br>- Walt Disney, co<br><br>-founder of the Walt Disney Company.',
		'\"You miss 100 percent of the shots you don\'t take.\" Wayne Gretzky, NHL Hall of Famer.',
		'\"Do not be embarrassed by your failures, learn from them and start again.\" <br><br>- Richard Branson, founder of the Virgin Group.',
		'\"It does not matter how slowly you go as long as you do not stop.\" <br><br>- Confucius.',
		'\"It\'s hard to beat a person who never gives up.\" <br><br>- Babe Ruth, Major League Baseball Hall of Famer.',
		'\"Fail often so you can succeed sooner.\" <br><br>- Tom Kelley, Ideo partner.',
		'\"We are currently not planning on conquering the world.\" <br><br>- Sergey Brin, co<br><br>-founder of Google.',
		'\"Timing, perseverance, and ten years of trying will eventually make you look like an overnight success.\" <br><br>- Biz Stone, co<br><br>-founder of Twitter.',
		'\"You may be disappointed if you fail, but you are doomed if you don\'t try.\" Beverly Sills, opera singer.',
		'\"When you cease to dream you cease to live\" <br><br>- Malcolm Forbes, chairman and editor in chief of Forbes Magazine.',
		'\"Don’t worry about funding if you don’t need it. Today it’s cheaper to start a business than ever.\"<br><br>- Noah Everett, founder Twitpic.',
		'\"Your most unhappy customers are your greatest source of learning.\" <br><br>– Bill Gates, co<br><br>-founder of Microsoft.',
		'\"I have not failed. I’ve just found 10,000 ways that won’t work.\" <br><br>– Thomas Edison, inventor.',
		'\"Entrepreneurship is neither a science nor an art. It is a practice.\" <br><br>– Peter Drucker, management consultant, educator, and author.',
		'\"Success is how high you bounce after you hit bottom.\" <br><br>– General George Patton.',
		'\"If you’re not embarrassed by the first version of your product, you’ve launched too late.\" <br><br>– Reid Hoffman, co<br><br>-founder of LinkedIn.',
		'\"Positive thinking will let you do everything better than negative thinking will.\" <br><br>– Zig Ziglar, author, salesman, and motivational speaker.',
		'\"Don’t try to be original, just try to be good.\" —Paul Rand, graphic designer.',
		'\"I’m not afraid of dying, I’m afraid of not trying.\" <br><br>– Jay Z, musician.',
		'\"Whatever the mind can conceive and believe, the mind can achieve.\" <br><br>– Dr. Napoleon Hill, author of Think and Grow Rich.',
		'\"Eighty percent of success is showing up.\" <br><br>– Woody Allen',
		'\"It is never too late to be what you might have been.\" <br><br>– George Eliot',
		'\"When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.\" <br><br>– Henry Ford',
		'\"Challenges are what make life interesting and overcoming them is what makes life meaningful.\" <br><br>– Joshua Marine',
		'\"You can\'t fall if you don\'t climb. But there\'s no joy in living your whole life on the ground.\" <br><br>– Unknown',
		'\"If you want to lift yourself up, lift up someone else.\" <br><br>– Booker T. Washington',
		'\"Rarely have I seen a situation where doing less than the other guy is a good strategy.\" <br><br>– Jimmy Spithill',
		'\"Your time is limited, so don\'t waste it living someone else\'s life.\" <br><br>– Steve Jobs',
		'\"I am not a product of my circumstances. I am a product of my decisions.\" <br><br>– Stephen Covey',
		'\"I\'ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.\" <br><br>–  Maya Angelou',
		'\"The two most important days in your life are the day you are born and the day you find out why.\" <br><br>–  Mark Twain',
		'\"Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it.\" <br><br>–  Johann Wolfgang von Goethe',
		'\"Life shrinks or expands in proportion to one\'s courage.\" <br><br>– Anais Nin',
		'\"There is only one way to avoid criticism: Do nothing, say nothing, and be nothing.\" <br><br>– Aristotle',
		'\"Do what you can, where you are, with what you have.\" <br><br>– Teddy Roosevelt',
		'\"Everything you\'ve ever wanted is on the other side of fear.\" <br><br>– George Addair',
		'\"Fall seven times and stand up eight.\" <br><br>– Japanese proverb',
		'\"Two roads diverged in a wood, and I, I took the one less traveled by, and that has made all the difference.\" <br><br>– Robert Frost',
		'\"What\'s money? A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants to do.\" <br><br>– Bob Dylan',
		'\"A person who never made a mistake never tried anything new.\" <br><br>– Albert Einstein',
		'\"The person who says it cannot be done should not interrupt the person who is doing it.\" <br><br>– Chinese proverb',
		'\"You can\'t use up creativity. The more you use, the more you have.\" <br><br>– Maya Angelou',
		'\"You miss 100 percent of the shots you don\'t take.\" <br><br>– Wayne Gretzky',
		'\"Build your own dreams, or someone else will hire you to build theirs.\" <br><br>– Farrah Gray',
		'\"It does not matter how slowly you go as long as you do not stop.\" <br><br>– Confucius',
		'\"If you do what you\'ve always done, you\'ll get what you\'ve always gotten.\" <br><br>– Tony Robbins',
		'\"You may be disappointed if you fail, but you are doomed if you don\'t try.\" <br><br>– Beverly Sills',
		'\"Few things can help an individual more than to place responsibility on him, and to let him know that you trust him.\" <br><br>– Booker T. Washington',
		'\"Remember, no one can make you feel inferior without your consent.\" <br><br>– Eleanor Roosevelt',
		'\"The question isn\'t who is going to let me; it\'s who is going to stop me.\" <br><br>– Ayn Rand',
		'\"The only way to do great work is to love what you do.\" <br><br>– Steve Jobs ',
		'\"I attribute my success to this: I never gave or took any excuse.\" <br><br>– Florence Nightingale',
		'\"The most difficult thing is the decision to act, the rest is merely tenacity.\" <br><br>– Amelia Earhart'
	]

	// Retrieve Each


	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 * Using Math.round() will give you a non<br><br>-uniform distribution!
	 */
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

    var i = getRandomInt(0, quotes.length -1);

    var classes = '';

        classes += "<p>" + quotes[i] + "</p>";


    $('#quote').append(classes);

   	if(getUrlParameter('auto') === 'true'){
		setTimeout(function() {
			chrome.runtime.sendMessage({action: "screenshot", name: "quote"});
		}, 1500);
        
   	} 
});