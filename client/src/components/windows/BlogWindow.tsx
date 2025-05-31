export function BlogWindow() {
  return (
    <div className="p-4 h-full">
      <div className="bg-white border-2 border-[rgb(var(--win-border-dark))] h-full p-3 overflow-auto scrollbar font-mono text-sm">
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2">
            ideas.txt - Last modified: {new Date().toLocaleDateString()}
          </div>
          <hr className="border-gray-300 mb-4" />
        </div>
        
        <div className="whitespace-pre-line">
{`Why I Still Design Like It's 1998
Modern design is cool, but nothing beats a chunky pixel button and a drop shadow you can trip over. Call it nostalgia… or taste

2AM: Me vs. a stupid semicolon.
Winner: semicolon.
Lesson: always respect the semicolon.

Who says devs can't be stylish?
I debug in AirPods Max and wide-leg trousers. If the fit's clean, the code's cleaner.

Retro UIs > Modern Headaches
Windows 98 taught me one thing:
Click, drag, feel joy.
Modern apps?
Click, wait, crash.

Shower Thoughts
- If you can't fix the bug, at least fix your fit.
- My shoes? Too clean to walk 
- Coffee ≠ creativity, but Music = genius.
- Why is it always "localhost:3000" and never "localhost: how are you?"
- Fashion rule #1: If it confuses your mom, you're doing it right.`}
        </div>
        
        <div className="mt-8 text-center">
          <div className="text-xs text-gray-500">--- End of File ---</div>
          <div className="blink text-xs mt-2">█</div>
        </div>
      </div>
    </div>
  );
}
