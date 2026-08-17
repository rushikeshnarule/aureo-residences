<?php
/**
 * The template for displaying comments.
 *
 * @package Aureo
 */

if ( post_password_required() ) {
    return;
}
?>

<div id="comments" class="comments-area mt-16 pt-12 border-t border-stone-200">
    <?php if ( have_comments() ) : ?>
        <h3 class="text-2xl font-serif font-bold text-aureo-dark mb-8">
            <?php
            $comments_number = get_comments_number();
            if ( '1' === $comments_number ) {
                printf( _x( 'One Thought on &ldquo;%s&rdquo;', 'comments title', 'aureo' ), get_the_title() );
            } else {
                printf(
                    /* translators: 1: number of comments, 2: post title */
                    _nx(
                        '%1$s Thought on &ldquo;%2$s&rdquo;',
                        '%1$s Thoughts on &ldquo;%2$s&rdquo;',
                        $comments_number,
                        'comments title',
                        'aureo'
                    ),
                    number_format_i18n( $comments_number ),
                    get_the_title()
                );
            }
            ?>
        </h3>

        <ol class="comment-list space-y-6">
            <?php
            wp_list_comments( array(
                'style'      => 'ol',
                'short_ping' => true,
                'avatar_size'=> 48,
            ) );
            ?>
        </ol>
    <?php endif; ?>

    <?php comment_form( array(
        'class_form' => 'mt-12 space-y-4',
        'class_submit' => 'px-8 py-3 rounded-full bg-aureo-gold-600 hover:bg-aureo-gold-700 text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer',
        'title_reply' => '<span class="text-xl font-serif font-bold text-aureo-dark">' . __( 'Leave a Response', 'aureo' ) . '</span>',
    ) ); ?>
</div>
