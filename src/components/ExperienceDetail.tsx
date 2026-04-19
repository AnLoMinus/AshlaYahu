import { useState, useEffect } from 'react';
import { Experience, categories } from '../data/experiences';
import { ArrowRight, Brain, Zap, Heart, Leaf, AlertTriangle, CheckCircle2, Info, MessageSquare, Send, Activity, Sparkles, Wand2, ThumbsUp, X, Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { User } from 'firebase/auth';
import { db, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc, updateDoc, increment, getDoc, setDoc } from '../lib/firebase';
import { formatDistanceToNow } from 'date-fns';
import { he } from 'date-fns/locale';
import { generateSubstitute } from '../services/substituteService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExportMenu } from './ExportMenu';
import { SubstituteImage } from './SubstituteImage';

interface ExperienceDetailProps {
  experience: Experience;
  onBack: () => void;
  user: User | null;
}

export function ExperienceDetail({ experience, onBack, user }: ExperienceDetailProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [communitySubstitutes, setCommunitySubstitutes] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingSub, setIsGeneratingSub] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [selectedSubstitute, setSelectedSubstitute] = useState<any | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const cat = categories.find(c => c.id === experience.category);

  useEffect(() => {
    if (user) {
      const checkFavorite = async () => {
        const favRef = doc(db, 'users', user.uid, 'favorites', experience.id);
        const favSnap = await getDoc(favRef);
        setIsFavorite(favSnap.exists());
      };
      checkFavorite();
    }
  }, [user, experience.id]);

  useEffect(() => {
    const qComments = query(
      collection(db, 'experience_comments'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribeComments = onSnapshot(qComments, (snapshot) => {
      const allComments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const expComments = allComments.filter((c: any) => c.experienceId === experience.id);
      setComments(expComments);
    });

    const qSubs = query(
      collection(db, 'substitutes'),
      orderBy('upvotes', 'desc')
    );

    const unsubscribeSubs = onSnapshot(qSubs, (snapshot) => {
      const allSubs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const expSubs = allSubs.filter((s: any) => s.experienceId === experience.id);
      setCommunitySubstitutes(expSubs);
    });

    return () => {
      unsubscribeComments();
      unsubscribeSubs();
    };
  }, [experience.id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'experience_comments'), {
        experienceId: experience.id,
        userId: user.uid,
        userName: user.displayName || 'משתמש אנונימי',
        userPhoto: user.photoURL || '',
        content: newComment.trim(),
        createdAt: serverTimestamp()
      });
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteDoc(doc(db, 'experience_comments', commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleGenerateSubstitute = async () => {
    if (!user || isGeneratingSub) return;
    
    setIsGeneratingSub(true);
    setGenerateError(null);
    try {
      const generatedSub = await generateSubstitute(experience);
      
      await addDoc(collection(db, 'substitutes'), {
        experienceId: experience.id,
        type: generatedSub.type,
        name: generatedSub.name,
        description: generatedSub.description,
        createdBy: user.uid,
        creatorName: user.displayName || 'משתמש אנונימי',
        createdAt: serverTimestamp(),
        upvotes: 0
      });
    } catch (error) {
      console.error('Error generating substitute:', error);
      setGenerateError('אירעה שגיאה ביצירת התחליף. ייתכן שהשרת עמוס או שהתשובה לא תקינה. אנא נסה שוב.');
    } finally {
      setIsGeneratingSub(false);
    }
  };

  const handleUpvoteSubstitute = async (subId: string) => {
    if (!user) return;
    try {
      const subRef = doc(db, 'substitutes', subId);
      await updateDoc(subRef, {
        upvotes: increment(1)
      });
    } catch (error) {
      console.error('Error upvoting substitute:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!user) return;
    try {
      const favRef = doc(db, 'users', user.uid, 'favorites', experience.id);
      if (isFavorite) {
        await deleteDoc(favRef);
        setIsFavorite(false);
      } else {
        await setDoc(favRef, {
          experienceId: experience.id,
          addedAt: serverTimestamp()
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const renderRatingBar = (label: string, value: number, icon: React.ReactNode, colorClass: string) => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-zinc-300">
          {icon}
          <span>{label}</span>
        </div>
        <span className="font-mono text-zinc-500">{value}/10</span>
      </div>
      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-1000", colorClass)} 
          style={{ width: `${(value / 10) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto bg-zinc-950 text-zinc-100" dir="rtl">
      {/* Header Banner */}
      <div className="relative border-b border-zinc-800 bg-zinc-900/50">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-emerald-500/20 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 py-8 relative">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors mb-6 text-sm font-medium"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה למפת הסטלות
          </button>
          
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className={cn("inline-flex px-3 py-1 rounded-full text-xs font-medium border mb-4", cat?.bg, cat?.color, cat?.border)}>
                {cat?.name}
              </div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-black text-zinc-100">{experience.name}</h1>
                {user && (
                  <button 
                    onClick={toggleFavorite}
                    className={cn(
                      "p-2 rounded-full transition-all",
                      isFavorite 
                        ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" 
                        : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                    )}
                    title={isFavorite ? "הסר ממועדפים" : "הוסף למועדפים"}
                  >
                    {isFavorite ? <BookmarkCheck className="w-6 h-6" /> : <Bookmark className="w-6 h-6" />}
                  </button>
                )}
              </div>
              <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">{experience.shortDescription}</p>
            </div>
            
            <div className="flex flex-col gap-2 text-sm font-mono text-zinc-500 bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
              <div className="flex justify-between gap-8">
                <span>משך השפעה:</span>
                <span className="text-zinc-300">{experience.duration}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span>עוצמה כללית:</span>
                <span className="text-zinc-300">{experience.intensityScale}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        
        {/* Rating Model */}
        <section>
          <h2 className="text-2xl font-bold text-zinc-100 mb-8 flex items-center gap-3">
            <Zap className="w-6 h-6 text-emerald-400" />
            מודל דירוג חוויות
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8">
            {renderRatingBar('עוצמה', experience.rating.intensity, <Zap className="w-4 h-4 text-yellow-400" />, 'bg-yellow-400')}
            {renderRatingBar('מודעות', experience.rating.awareness, <Brain className="w-4 h-4 text-purple-400" />, 'bg-purple-400')}
            {renderRatingBar('השפעה קוגניטיבית', experience.rating.cognitive, <Brain className="w-4 h-4 text-blue-400" />, 'bg-blue-400')}
            {renderRatingBar('השפעה רגשית', experience.rating.emotional, <Heart className="w-4 h-4 text-pink-400" />, 'bg-pink-400')}
            {renderRatingBar('טבעיות', experience.rating.naturalness, <Leaf className="w-4 h-4 text-emerald-400" />, 'bg-emerald-400')}
          </div>
        </section>

        {/* Deep Dive */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-zinc-200 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-cyan-400" />
                מנגנון פעולה
              </h3>
              <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
                <p><strong className="text-zinc-300">חומרים פעילים:</strong> {experience.activeIngredients.join(', ')}</p>
                <p><strong className="text-zinc-300">השפעה על המוח:</strong> {experience.brainEffect}</p>
                <p><strong className="text-zinc-300">מנגנון:</strong> {experience.mechanism}</p>
              </div>
            </div>

            <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                השפעות חיוביות
              </h3>
              <ul className="space-y-2">
                {experience.positiveEffects.map((effect, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                    {effect}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-red-900/10 border border-red-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                סיכונים ותופעות לוואי
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-red-300/80 mb-2">סיכונים מרכזיים:</h4>
                  <ul className="space-y-2">
                    {experience.risks.map((risk, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-red-300/80 mb-2">תופעות לוואי:</h4>
                  <ul className="space-y-2">
                    {experience.sideEffects.map((effect, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500/50" />
                        {effect}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Holy Substitutes */}
        <section>
          <div className="text-center mb-12 relative">
            <div className="absolute left-0 top-0">
              <ExportMenu 
                substitutes={[...experience.substitutes, ...communitySubstitutes]} 
                title={`תחליפים עבור ${experience.name} - Holy`} 
              />
            </div>
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
              תחליפים קדושים (Holy Substitutes)
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
              איך להגיע לאותה חוויה בדיוק, אבל בדרך טבעית, מודעת ובונה. הקהילה יצרה עבורך את התחליפים המדויקים ביותר.
            </p>
            {user ? (
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={handleGenerateSubstitute}
                  disabled={isGeneratingSub}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-zinc-950 font-bold px-6 py-3 rounded-full transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingSub ? (
                    <>
                      <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                      מייצר תחליף...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      צור תחליף בעזרת AI
                    </>
                  )}
                </button>
                {generateError && (
                  <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg max-w-md text-center">
                    {generateError}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-zinc-500 font-mono">התחבר כדי לייצר תחליפים חדשים</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Built-in Substitutes */}
            {experience.substitutes.map((sub, i) => (
              <div 
                key={`builtin-${i}`} 
                onClick={() => setSelectedSubstitute({ ...sub, isBuiltin: true })}
                className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/80 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] rounded-2xl p-6 transition-all duration-300 group relative overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 right-0 bg-emerald-500/10 border-b border-l border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-bl-xl">
                  מובנה
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-950/50 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-emerald-500/30 group-hover:text-emerald-400 transition-colors shadow-inner text-zinc-500">
                    {sub.type === 'plants' && <Leaf className="w-5 h-5" />}
                    {sub.type === 'breathing' && <Zap className="w-5 h-5" />}
                    {sub.type === 'meditation' && <Brain className="w-5 h-5" />}
                    {sub.type === 'movement' && <Activity className="w-5 h-5" />}
                    {sub.type === 'music' && <Heart className="w-5 h-5" />}
                    {sub.type === 'other' && <Sparkles className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-mono text-emerald-500/80 mb-1.5 uppercase tracking-widest">{sub.type}</div>
                    <h3 className="text-lg font-bold text-zinc-100 mb-2 tracking-tight">{sub.name}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">{sub.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Community Substitutes */}
            {communitySubstitutes.map((sub) => (
              <div 
                key={sub.id} 
                onClick={() => setSelectedSubstitute({ ...sub, isBuiltin: false })}
                className="bg-zinc-900/40 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] rounded-2xl p-6 transition-all duration-300 group relative overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 right-0 bg-cyan-500/10 border-b border-l border-cyan-500/20 text-cyan-400 text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-bl-xl flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  נוצר ע"י {sub.creatorName}
                </div>
                <div className="flex items-start gap-4 mt-2">
                  <div className="w-12 h-12 rounded-xl bg-zinc-950/50 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:border-cyan-500/40 group-hover:text-cyan-400 transition-colors shadow-inner text-cyan-600/70">
                    {sub.type === 'plants' && <Leaf className="w-5 h-5" />}
                    {sub.type === 'breathing' && <Zap className="w-5 h-5" />}
                    {sub.type === 'meditation' && <Brain className="w-5 h-5" />}
                    {sub.type === 'movement' && <Activity className="w-5 h-5" />}
                    {sub.type === 'music' && <Heart className="w-5 h-5" />}
                    {sub.type === 'other' && <Sparkles className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-mono text-cyan-500/80 mb-1.5 uppercase tracking-widest">{sub.type}</div>
                    <h3 className="text-lg font-bold text-zinc-100 mb-2 tracking-tight">{sub.name}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-3">{sub.description}</p>
                    <div className="flex items-center justify-between border-t border-zinc-800/60 pt-4 mt-2" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => handleUpvoteSubstitute(sub.id)}
                        disabled={!user}
                        className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-cyan-400 bg-zinc-950/50 hover:bg-cyan-500/10 border border-zinc-800 hover:border-cyan-500/30 px-3 py-1.5 rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-950/50 disabled:hover:border-zinc-800 disabled:hover:text-zinc-400"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{sub.upvotes || 0}</span>
                      </button>
                      <span className="text-[10px] text-zinc-600 font-mono">
                        {sub.createdAt?.toDate ? formatDistanceToNow(sub.createdAt.toDate(), { addSuffix: true, locale: he }) : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Forum */}
        <section className="border-t border-zinc-800 pt-16 pb-24">
          <h2 className="text-2xl font-bold text-zinc-100 mb-8 flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-cyan-400" />
            פורום קהילתי: {experience.name}
          </h2>

          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto">
              {comments.length === 0 ? (
                <div className="text-center py-12 text-zinc-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>אין עדיין תגובות. תהיה הראשון לשתף חוויה או מחקר!</p>
                </div>
              ) : (
                comments.map(comment => (
                  <div key={comment.id} className="flex gap-4">
                    {comment.userPhoto ? (
                      <img src={comment.userPhoto} alt={comment.userName} className="w-10 h-10 rounded-full border border-zinc-700 shrink-0" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold shrink-0">
                        {comment.userName?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-zinc-200 text-sm">{comment.userName}</span>
                          <span className="text-xs text-zinc-500 font-mono">
                            {comment.createdAt?.toDate ? formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true, locale: he }) : ''}
                          </span>
                        </div>
                        {(user?.uid === comment.userId || user?.email === 'quadcosmos@gmail.com') && (
                          <button 
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-xs text-zinc-600 hover:text-red-400 transition-colors"
                          >
                            מחק
                          </button>
                        )}
                      </div>
                      <div className="bg-zinc-800/50 rounded-2xl rounded-tr-none p-4 text-sm text-zinc-300 leading-relaxed border border-zinc-800/80">
                        {comment.content}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-zinc-800 bg-zinc-900/80">
              {user ? (
                <form onSubmit={handleCommentSubmit} className="relative">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="שתף חוויה, שאל שאלה או הצע תחליף..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-full pl-12 pr-6 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim() || isSubmitting}
                    className="absolute left-1.5 top-1/2 -translate-y-1/2 p-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="text-center text-sm text-zinc-500 py-2">
                  יש להתחבר כדי להגיב בפורום.
                </div>
              )}
            </div>
          </div>
        </section>

      </div>

      {/* Substitute Modal */}
      {selectedSubstitute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl border flex items-center justify-center shadow-inner",
                  selectedSubstitute.isBuiltin 
                    ? "bg-zinc-950/50 border-emerald-500/30 text-emerald-400" 
                    : "bg-zinc-950/50 border-cyan-500/30 text-cyan-400"
                )}>
                  {selectedSubstitute.type === 'plants' && <Leaf className="w-6 h-6" />}
                  {selectedSubstitute.type === 'breathing' && <Zap className="w-6 h-6" />}
                  {selectedSubstitute.type === 'meditation' && <Brain className="w-6 h-6" />}
                  {selectedSubstitute.type === 'movement' && <Activity className="w-6 h-6" />}
                  {selectedSubstitute.type === 'music' && <Heart className="w-6 h-6" />}
                  {selectedSubstitute.type === 'other' && <Sparkles className="w-6 h-6" />}
                </div>
                <div>
                  <div className={cn(
                    "text-[10px] font-mono mb-1 uppercase tracking-widest",
                    selectedSubstitute.isBuiltin ? "text-emerald-500/80" : "text-cyan-500/80"
                  )}>
                    {selectedSubstitute.type}
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-100">{selectedSubstitute.name}</h2>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ExportMenu 
                  substitutes={[selectedSubstitute]} 
                  title={`תחליף - ${selectedSubstitute.name}`} 
                  elementIdToPdf="substitute-modal-content"
                />
                <button 
                  onClick={() => setSelectedSubstitute(null)}
                  className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div id="substitute-modal-content" className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-invert prose-emerald max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {selectedSubstitute.description}
                </ReactMarkdown>
              </div>
              
              <SubstituteImage substitute={selectedSubstitute} />
            </div>
            
            {!selectedSubstitute.isBuiltin && (
              <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  נוצר ע"י <span className="text-zinc-200 font-bold">{selectedSubstitute.creatorName}</span>
                </div>
                <button 
                  onClick={() => handleUpvoteSubstitute(selectedSubstitute.id)}
                  disabled={!user}
                  className="flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-cyan-400 bg-zinc-950/50 hover:bg-cyan-500/10 border border-zinc-800 hover:border-cyan-500/30 px-4 py-2 rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{selectedSubstitute.upvotes || 0} הצבעות</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
