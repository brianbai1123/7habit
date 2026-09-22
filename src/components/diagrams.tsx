import type { DiagramId } from "@/content/types";

const captions: Record<DiagramId, string> = {
  whole: "原书的顺序：先打地基，再赢得个人的胜利，然后才是公众的胜利，更新环绕全程。",
  paradigm: "同一件事还在。换了看它的地图，下一步就会不同。",
  "see-do-get": "结果从做法来，做法从看法来。只改最后一格，常常改不久。",
  "habit-def": "三样叠齐，习惯才算长出来。只停在「我懂了」，还差两样。",
  maturity: "独立是重要的中点。生活里最要紧的事，多半要走到互赖才做得成。",
  ppc: "成果是金蛋，能力是鹅。两边一起留住，才是柯维说的效能。",
  circles: "力气放进里面那一圈，外面你在乎、暂时推不动的事，才有机会慢慢被影响。",
  matrix: "要事第一住在右上角：重要，但还没有人来催。",
  centers: "中心一换，安全感、方向、智慧和力量会一起换地方。",
  bank: "信任靠小事积起来。句子很漂亮，账户仍可能是空的。",
  listen: "多数对话停在中间。同理是走进对方的地图，不只是听清词。",
  synergy: "客气的折中仍是旧办法的平均。协同要的是原来桌上没有的那个办法。",
  saw: "四个维度互相拖累。只磨最显眼的一面，另外三面会把锯重新磨钝。",
};

export function Diagram({ id }: { id: DiagramId }) {
  return (
    <figure className="my-8 border-y border-line bg-paper/80 py-5">
      <div className="px-1">{renderDiagram(id)}</div>
      <figcaption className="mt-4 text-sm leading-relaxed text-muted">
        {captions[id]}
      </figcaption>
    </figure>
  );
}

function renderDiagram(id: DiagramId) {
  switch (id) {
    case "whole":
      return (
        <ol className="space-y-3">
          {[
            ["1", "地基", "由内而外：范式、原则、品格"],
            ["2", "个人的胜利", "习惯一到三，从依赖走到独立"],
            ["3", "公众的胜利", "习惯四到六，从独立走到互赖"],
            ["4", "不断更新", "习惯七，给整条路供电"],
          ].map(([n, title, text]) => (
            <li key={n} className="grid grid-cols-[2rem_1fr] gap-3">
              <span className="font-serif text-lg text-clay">{n}</span>
              <span>
                <span className="font-semibold text-ink">{title}</span>
                <span className="mt-0.5 block text-sm text-muted">{text}</span>
              </span>
            </li>
          ))}
        </ol>
      );
    case "paradigm":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-pine">地图甲</p>
            <p className="mt-1 text-sm leading-relaxed">老师针对我。</p>
            <p className="mt-2 text-sm text-muted">下一步：生气，不改错题。</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-pine">地图乙</p>
            <p className="mt-1 text-sm leading-relaxed">这几道题我还不会。</p>
            <p className="mt-2 text-sm text-muted">下一步：把错题重做一遍。</p>
          </div>
          <p className="text-sm text-ink sm:col-span-2">同一份 72 分，还摆在桌上。</p>
        </div>
      );
    case "see-do-get":
      return (
        <ol className="grid gap-3 sm:grid-cols-3">
          {[
            ["看法", "我用哪张地图"],
            ["做法", "我实际怎么选"],
            ["结果", "生活给出的回应"],
          ].map(([title, text], index) => (
            <li key={title}>
              <p className="font-serif text-lg text-pine">
                {index + 1}. {title}
              </p>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ol>
      );
    case "habit-def":
      return (
        <ul className="grid gap-3 sm:grid-cols-3">
          {[
            ["知识", "做什么，为什么"],
            ["技能", "具体怎么做"],
            ["意愿", "到时候真的肯做"],
          ].map(([title, text]) => (
            <li key={title} className="border-l-2 border-pine pl-3">
              <p className="font-semibold">{title}</p>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ul>
      );
    case "maturity":
      return (
        <ol className="grid gap-4 sm:grid-cols-3">
          {[
            ["依赖", "你", "你要帮我，都怪你"],
            ["独立", "我", "我负责，我做得到"],
            ["互赖", "我们", "一起做出谁单独做不出的结果"],
          ].map(([title, voice, text]) => (
            <li key={title}>
              <p className="font-serif text-xl text-pine">{title}</p>
              <p className="text-sm font-semibold text-clay">内心语言是「{voice}」</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ol>
      );
    case "ppc":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-serif text-xl text-pine">金蛋 · 成果</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              分数、做完的作业、一次成功的合作。
            </p>
          </div>
          <div>
            <p className="font-serif text-xl text-pine">鹅 · 产能</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              睡眠、理解力、信任和还能继续做的习惯。
            </p>
          </div>
        </div>
      );
    case "circles":
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-52 w-52 items-center justify-center rounded-full border border-clay/50 bg-band/50">
            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-pine text-center text-paper">
              <span className="text-sm font-semibold">影响圈</span>
              <span className="mt-1 px-4 text-xs leading-snug text-paper/80">
                我的准备、道歉、下一句话
              </span>
            </div>
          </div>
          <p className="text-sm text-muted">外圈是关注圈：天气、舆论、别人的心情、考试难度。</p>
        </div>
      );
    case "matrix":
      return (
        <div className="grid grid-cols-[4.5rem_1fr_1fr] gap-px bg-line text-sm">
          <div className="bg-paper" />
          <div className="bg-paper px-3 py-2 font-semibold">紧急</div>
          <div className="bg-paper px-3 py-2 font-semibold">不紧急</div>
          <div className="bg-paper px-3 py-2 font-semibold">重要</div>
          <div className="bg-paper px-3 py-3 leading-relaxed">
            危机、马上到期的事。要处理，别长期住在这里。
          </div>
          <div className="bg-pine-soft px-3 py-3 leading-relaxed text-pine">
            准备、关系、学习、更新。要事第一住在这里。
          </div>
          <div className="bg-paper px-3 py-2 font-semibold">不重要</div>
          <div className="bg-paper px-3 py-3 leading-relaxed">
            别人的催促和一部分热闹。看起来忙。
          </div>
          <div className="bg-paper px-3 py-3 leading-relaxed">纯粹的消耗。</div>
        </div>
      );
    case "centers":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-semibold text-clay">中心是名次</p>
            <ul className="mt-2 space-y-1 text-sm leading-relaxed text-muted">
              <li>安全感随分数晃</li>
              <li>方向变成怎样拿分</li>
              <li>力量来自排名</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-pine">中心是原则</p>
            <ul className="mt-2 space-y-1 text-sm leading-relaxed text-muted">
              <li>一次评价没收不了正直</li>
              <li>方向来自自己的使命</li>
              <li>力量来自按原则做的习惯</li>
            </ul>
          </div>
        </div>
      );
    case "bank":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-semibold text-pine">存款</p>
            <ul className="mt-2 space-y-1 text-sm leading-relaxed">
              <li>理解这个具体的人</li>
              <li>在小事上用心</li>
              <li>说到做到</li>
              <li>把期待说清楚</li>
              <li>人前人后一致</li>
              <li>做错了真诚道歉</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-clay">取款</p>
            <ul className="mt-2 space-y-1 text-sm leading-relaxed">
              <li>用自己的方式一概而论</li>
              <li>轻视小事</li>
              <li>食言</li>
              <li>让对方猜你的期待</li>
              <li>背后另一套</li>
              <li>错了还辩</li>
            </ul>
          </div>
        </div>
      );
    case "listen":
      return (
        <ol className="space-y-2 text-sm">
          {(
            [
              ["不听", false],
              ["装出在听", false],
              ["只听自己感兴趣的", false],
              ["听清词句", false],
              ["同理：连意思和感受一起，站进对方的地图", true],
            ] as [string, boolean][]
          ).map(([label, top], index) => (
            <li
              key={label}
              className={
                top
                  ? "bg-pine px-3 py-2 font-semibold text-paper"
                  : "px-3 py-2 text-muted"
              }
            >
              {index + 1}. {label}
            </li>
          ))}
        </ol>
      );
    case "synergy":
      return (
        <ul className="space-y-3 text-sm leading-relaxed">
          <li>
            <span className="font-semibold">防守。</span>
            信任低，只想赢过对方。合作接近零。
          </li>
          <li>
            <span className="font-semibold">妥协。</span>
            彼此客气，各削掉一点。结果是旧方案的平均。
          </li>
          <li>
            <span className="font-semibold text-pine">协同。</span>
            信任高，差异被拿出来，出现第三种办法。
          </li>
        </ul>
      );
    case "saw":
      return (
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            ["身体", "运动、吃饭、睡觉", "给积极主动供电"],
            ["精神", "想清楚什么真正重要", "给以终为始供电"],
            ["心智", "阅读、写作、计划", "给要事第一供电"],
            ["社会 / 情感", "在关系里练习理解与合作", "给习惯四到六供电"],
          ].map(([title, text, feed]) => (
            <li key={title} className="border-l-2 border-pine pl-3">
              <p className="font-semibold">{title}</p>
              <p className="mt-1 text-sm text-muted">{text}</p>
              <p className="mt-1 text-sm text-pine">{feed}</p>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}
