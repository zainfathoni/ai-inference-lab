/*
  Reusable in-page quiz widget for Zain's AI Inference Lab.

  Markup contract (all data lives in the HTML, so this file stays lesson-agnostic):

    <div class="quiz" data-quiz>
      <h3>Check yourself</h3>
      <form>
        <fieldset data-answer="c" data-why="Explanation shown after submitting.">
          <legend>1. Question text?</legend>
          <label><input type="radio" name="q1" value="a"> Option A</label>
          <label><input type="radio" name="q1" value="b"> Option B</label>
          <label><input type="radio" name="q1" value="c"> Option C</label>
        </fieldset>
        ...
      </form>
    </div>

  The Check / Reset buttons, verdicts and score line are injected here. No page
  reload, no build step, no network — works over file:// like every other asset.
*/
(function () {
  'use strict';

  function build(root) {
    var form = root.querySelector('form');
    if (!form) return;
    var sets = Array.prototype.slice.call(form.querySelectorAll('fieldset[data-answer]'));
    if (!sets.length) return;

    // One verdict paragraph per question, revealed on submit.
    sets.forEach(function (fs) {
      var v = document.createElement('p');
      v.className = 'verdict';
      v.hidden = true;
      fs.appendChild(v);
    });

    var actions = document.createElement('div');
    actions.className = 'actions';

    var check = document.createElement('button');
    check.type = 'submit';
    check.textContent = 'Check my answers';

    var reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'secondary';
    reset.textContent = 'Try again';

    var score = document.createElement('p');
    score.className = 'score';
    score.setAttribute('role', 'status');
    score.setAttribute('aria-live', 'polite');

    actions.appendChild(check);
    actions.appendChild(reset);
    form.appendChild(actions);
    form.appendChild(score);

    function grade() {
      var right = 0;
      var unanswered = 0;

      sets.forEach(function (fs) {
        var picked = fs.querySelector('input[type=radio]:checked');
        var verdict = fs.querySelector('.verdict');
        verdict.hidden = false;
        verdict.classList.remove('right', 'wrong');

        if (!picked) {
          unanswered++;
          verdict.textContent = 'Not answered yet.';
          return;
        }
        var ok = picked.value === fs.getAttribute('data-answer');
        if (ok) right++;
        verdict.classList.add(ok ? 'right' : 'wrong');
        verdict.innerHTML =
          '<b>' + (ok ? 'Correct.' : 'Not quite.') + '</b> ' + (fs.getAttribute('data-why') || '');
      });

      score.textContent =
        right + ' of ' + sets.length + ' correct' +
        (unanswered ? ' (' + unanswered + ' unanswered)' : '') + '.';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      grade();
    });

    reset.addEventListener('click', function () {
      form.reset();
      sets.forEach(function (fs) {
        var v = fs.querySelector('.verdict');
        v.hidden = true;
        v.textContent = '';
        v.classList.remove('right', 'wrong');
      });
      score.textContent = '';
      var first = form.querySelector('input[type=radio]');
      if (first) first.focus();
    });
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-quiz]'), build);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
