import { type Editor } from "@tiptap/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import { AlignCenter, AlignLeft, AlignRight, Bold, Heading, Heading1, Heading2, Heading3, Italic, Link, List, ListOrdered, Redo, Strikethrough, Underline, Undo } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";

interface iAppProps {
    editor: Editor | null;
}


export function Menubar({ editor }: iAppProps) {
    if(!editor) {
        return null;
    }

    // Force re-render on editor state changes so `editor.isActive()` reflects current state
    const [, setTick] = useState(0);
    const forceUpdate = useCallback(() => setTick((x) => x + 1), []);

    useEffect(() => {
        if (!editor) return;
        editor.on('selectionUpdate', forceUpdate);
        editor.on('transaction', forceUpdate);
        editor.on('focus', forceUpdate);
        editor.on('blur', forceUpdate);
        return () => {
            editor.off('selectionUpdate', forceUpdate);
            editor.off('transaction', forceUpdate);
            editor.off('focus', forceUpdate);
            editor.off('blur', forceUpdate);
        };
    }, [editor, forceUpdate]);

    return (
        <div className="border border-input border-t-0 border-x-0 rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center">
            <TooltipProvider>
                <div className="flex flex-wrap gap-1">
                    {/* bold */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive("bold")} 
                            onPressedChange={()=> 
                                editor.chain().focus().toggleBold().run()
                            }
                                className={cn(
                                    editor.isActive("bold") && 'bg-muted text-muted-foreground'
                                )}
                                >
                                <Bold />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Bold
                        </TooltipContent>
                    </Tooltip>
                    {/* italic */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive("italic")} 
                            onPressedChange={()=> 
                                editor.chain().focus().toggleItalic().run()
                            }
                                className={cn(
                                    editor.isActive("italic") && 'bg-muted text-muted-foreground'
                                )}
                                >
                                <Italic />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Italic
                        </TooltipContent>
                    </Tooltip>
                    {/* strike */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive("strike")} 
                            onPressedChange={()=> 
                                editor.chain().focus().toggleStrike().run()
                            }
                                className={cn(
                                    editor.isActive("strike") && 'bg-muted text-muted-foreground'
                                )}
                                >
                                <Strikethrough />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Strike
                        </TooltipContent>
                    </Tooltip>
                    {/* heading 1 */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive("heading", { level: 1 })} 
                            onPressedChange={()=> 
                                editor.chain().focus().toggleHeading({ level: 1 }).run()
                            }
                                className={cn(
                                    editor.isActive("heading", { level: 1 }) && 'bg-muted text-muted-foreground'
                                )}
                                >
                                <Heading1 />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Heading 1
                        </TooltipContent>
                    </Tooltip>
                    {/* heading 2 */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive("heading", { level: 2 })} 
                            onPressedChange={()=> 
                                editor.chain().focus().toggleHeading({ level: 2 }).run()
                            }
                                className={cn(
                                    editor.isActive("heading", { level: 2 }) && 'bg-muted text-muted-foreground'
                                )}
                                >
                                <Heading2 />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Heading 2
                        </TooltipContent>
                    </Tooltip>
                    {/* heading 3 */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive("heading", { level: 3 })} 
                            onPressedChange={()=> 
                                editor.chain().focus().toggleHeading({ level: 3 }).run()
                            }
                                className={cn(
                                    editor.isActive("heading", { level: 3 }) && 'bg-muted text-muted-foreground'
                                )}
                                >
                                <Heading3 />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Heading 3
                        </TooltipContent>
                    </Tooltip>
                    {/* underline */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive("underline")} 
                            onPressedChange={()=> 
                                editor.chain().focus().toggleUnderline().run()
                            }
                                className={cn(
                                    editor.isActive("underline") && 'bg-muted text-muted-foreground'
                                )}
                                >
                                <Underline />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Underline
                        </TooltipContent>
                    </Tooltip>
                    {/* bulletlist */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive("bulletList")} 
                            onPressedChange={()=> 
                                editor.chain().focus().toggleBulletList().run()
                            }
                                className={cn(
                                    editor.isActive("bulletList") && 'bg-muted text-muted-foreground'
                                )}
                                >
                                <List />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Bullet List
                        </TooltipContent>
                    </Tooltip>
                    {/* orderedlist */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive("orderedList")} 
                            onPressedChange={()=> 
                                editor.chain().focus().toggleOrderedList().run()
                            }
                                className={cn(
                                    editor.isActive("orderedList") && 'bg-muted text-muted-foreground'
                                )}
                                >
                                <ListOrdered />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Ordered List
                        </TooltipContent>
                    </Tooltip>

                </div>
                <div className="w-px h-6 bg-border mx-2">
                </div>
                <div className="flex flex-wrap gap-1">
                    {/* textalign left */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive({textAlign: "left"})} 
                            onPressedChange={()=> 
                                editor.chain().focus().setTextAlign("left").run()
                            }
                                className={cn(
                                    editor.isActive({textAlign: "left"}) && 'bg-muted text-muted-foreground'
                                )}
                                >
                                <AlignLeft />  
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Text Align Left
                        </TooltipContent>
                    </Tooltip>
                    {/* textalign center */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive({textAlign: "center"})} 
                            onPressedChange={()=> 
                                editor.chain().focus().setTextAlign("center").run()
                            }
                                className={cn(
                                    editor.isActive({textAlign: "center"}) && 'bg-muted text-muted-foreground'
                                )}
                                >
                                <AlignCenter />  
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Text Align Center
                        </TooltipContent>
                    </Tooltip>
                    {/* textalign right */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive({textAlign: "right"})} 
                            onPressedChange={()=> 
                                editor.chain().focus().setTextAlign("right").run()
                            }
                                className={cn(
                                    editor.isActive({textAlign: "right"}) && 'bg-muted text-muted-foreground'
                                )}
                                >
                                <AlignRight />  
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Text Align Right
                        </TooltipContent>
                    </Tooltip>
                    {/* link */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle size="sm" pressed={editor.isActive("link")} 
                            onPressedChange={()=> 
                                editor.chain().focus().toggleLink().run()
                            }
                                className={cn(
                                    editor.isActive("link") && 'bg-muted text-muted-foreground'
                                )}
                                >
                                <Link />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            Link
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className="w-px h-6 bg-border mx-2">
                </div>
                <div className="flex flex-wrap gap-1">
                    {/* Undo */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button 
                                size="sm" 
                                variant="ghost" 
                                type="button" 
                                onClick={() => 
                                    editor?.chain().focus().undo().run()
                                }
                                disabled={!editor.can().undo()}
                            >
                                <Undo />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Undo
                        </TooltipContent>
                    </Tooltip>
                    {/* Redo */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button 
                                size="sm" 
                                variant="ghost" 
                                type="button" 
                                onClick={() => 
                                    editor?.chain().focus().redo().run()
                                }
                                disabled={!editor.can().redo()}
                            >
                                <Redo />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Redo
                        </TooltipContent>
                    </Tooltip>
                </div>
            </TooltipProvider>
        </div>
    )
}